console.log('This is the background page.');
console.log('Put the background scripts here.');

let profileData;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.method === 'renderPopup') {
    // TODO: Try to fetch auth token from the cookies
    // chrome.cookies
    //   .get({
    //     name: 'auth_token',
    //     url: 'https://smart-apply.io',
    //   })
    //   .then((res) => {
    //     console.log('auth_token', res);
    //   });
    const response = await fetch('https://api.smart-apply.io/api/me', {
      headers: {
        Authorization: 'Token xhvh78qkpvm2lwrng267h5avv68nuh12',
      },
    }).then((res) => res.json());
    profileData = response;
    sendResponse({ data: 'data' });
    return true;
  } else if (request.method === 'fillButtonClick') {
    console.log(profileData);
    sendResponse({
      data: profileData,
    });
    return true;
    // } else if (request.method === 'getFile') {
    //   fetch(
    //     'https://api.smart-apply.io/api/resume/download?resume_id=14f878e9-fd08-4f2c-89aa-7231f949fb37'
    //   ).then(async (n) => {
    //     (a = await n.arrayBuffer()), (i = n.headers.get('Content-Type') || '');
    //     let r = '';
    //     'application/pdf' === i
    //       ? (r = '.pdf')
    //       : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ===
    //         i
    //       ? (r = '.docx')
    //       : 'application/msword' === i && (r = '.doc');
    //     const s = r;
    //     sendResponse({
    //       type: i,
    //       arrayBuffer: Array.from(new Uint8Array(a)),
    //       fileName: s,
    //     });
    //   });

    //   return true;
  }
});

chrome.webRequest.onHeadersReceived.addListener(
  async (e) => {
    console.log('on job application page');
    chrome.scripting.executeScript({
      target: { tabId: e.tabId },
      files: ['autofill.bundle.js'],
    });
  },
  {
    urls: [
      '*://*.breezy.hr/*/apply*',
      '*://boards.greenhouse.io/*/jobs/*',
      '*://jobs.lever.co/*/*/apply',
      '*://jobs.ashbyhq.com/*',
      '*://jobs.apple.com/app/api/v1/*/talent/submit',
      '*://*.google.com/*/applications/*/submit*',
      '*://jobs.jobvite.com/*',
      '*://*.bamboohr.com/jobs/view.php*',
      '*://*.smartrecruiters.com/*',
      '*://*.icims.com/*',
      '*://jobs.roblox.com/api/apply/v2/jobs/submit*',
      '*://*.applytojob.com/apply/confirm/*',
      '*://*/api/v1/public/organizations/*/jobs/*/apply',
      '*://www.okta.com/company/careers/*',
      '*://www.comeet.co/careers-api*',
      '*://*.freshteam.com/jobs/*',
      '*://*.recruitee.com/*/c',
    ],
  }
);
