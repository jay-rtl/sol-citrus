import { execFileSync } from 'node:child_process';
const repository = 'jay-rtl/sol-citrus';
const raw = execFileSync('git',['credential','fill'], {
  input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',
  env:{...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'},stdio:['pipe','pipe','pipe']
});
const token = raw.split('\n').find(line=>line.startsWith('password='))?.slice(9);
if(!token) throw new Error('Stored GitHub credentials are unavailable');
async function request(path,method='GET',body) {
  const res=await fetch(`https://api.github.com/repos/${repository}${path}`, {
    method, headers:{ Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','User-Agent':'Sol-Citrus-Deployment','X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':'application/json'}:{}) },
    ...(body?{body:JSON.stringify(body)}:{})
  });
  const data=res.status===204?{}:await res.json();
  return {status:res.status,data};
}
if(process.argv[2]==='setup') {
  let result=await request('/pages');
  if(result.status===404) result=await request('/pages','POST',{build_type:'workflow'});
  else if(result.status===200 && result.data.build_type!=='workflow') result=await request('/pages','PUT',{build_type:'workflow'});
  if(result.status>=400)throw new Error(`GitHub Pages setup ${result.status}: ${result.data.message}`);
  console.log(JSON.stringify({status:result.status,url:result.data.html_url,build_type:result.data.build_type}));
} else {
  const [pages,runs]=await Promise.all([request('/pages'),request('/actions/runs?per_page=3')]);
  console.log(JSON.stringify({pages:{status:pages.status,url:pages.data.html_url,build_type:pages.data.build_type},runs:runs.data.workflow_runs?.map(r=>({id:r.id,status:r.status,conclusion:r.conclusion,commit:r.head_sha,url:r.html_url}))}));
}
