import './webcomponents';
import { render } from 'react-dom';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import ProgressProvider from './ProgressProvider';
const AutoFill = () => {
  return (
    <div className="font-sans fixed top-0 right-0 shadow-md bg-white rounded-md border mt-4 mr-4">
      <div
        id="filler-popup"
        className="onload  max-w-sm w-full py-6 px-6 "
        style={{ zIndex: 2147483647 }}
      >
        <div id="popup-columns" className="flex flex-col">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              id="smart-apply-icon"
              alt="Smart Apply"
              src="https://uploads-ssl.webflow.com/6084b8de4ac993c6d00ea62c/608608149c21577a9e5cf126_Symbol.svg"
            />
            <h1 className="ml-4 text-xl font-medium">Apply with Smart Apply!</h1>
            <button
              type="button"
              className="ml-auto text-gray-400 hover:text-gray-500 focus:outline-none transition ease-in-out duration-150"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="my-4 pr-8 text-sm text-gray-600">
            We'll autofill this job application with data from your Smart Apply
            common application. Don't forget to answer any job-specific
            questions!
          </p>
          <div className="flex pr-8">
            <button
              id="fill-button"
              type="button"
              className="w-1/2 shadow-sm items-center justify-center text-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-black bg-primary-dark hover:bg-primary-base focus:outline-none transition ease-in-out duration-150 bg-lime-300"
              aria-label="Autofill"
              onClick={() => {
                chrome.runtime
                  .sendMessage({ method: 'fillButtonClick' })
                  .then(({ data }) => {
                    document.querySelector(
                      'input[id="first_name"'
                    ).value = `${data.first_name}`;

                    document.querySelector(
                      'input[id="last_name"'
                    ).value = `${data.last_name}`;

                    document.querySelector(
                      'input[id="email"'
                    ).value = `${data.email}`;

                    document.querySelector(
                      'input[id="phone"'
                    ).value = `${data.phone_number}`;

                    document.querySelector(
                      "input[autocomplete='custom-question-linkedin-profile']"
                    ).value = `${data.linkedin_url}`;

                    if (data.profile.pronoun) {
                      document.querySelector(
                        "input[autocomplete='custom-question-pronouns']"
                      ).value = `${data.profile.pronoun}`;
                    }

                    if (data.experiment_attributes.gender) {
                      document.querySelector(
                        "span[id='select2-chosen-1']"
                      ).innerHTML = `${data.experiment_attributes.gender}`;
                    }

                    if (data.experiment_attributes.ethnicity) {
                      document.querySelector(
                        "span[id='select2-chosen-2']"
                      ).innerHTML = `${data.experiment_attributes.ethnicity}`;
                    }

                    if (data.experiment_attributes.ethnicity) {
                      document.querySelector(
                        "span[id='select2-chosen-2']"
                      ).innerHTML = `${data.experiment_attributes.ethnicity}`;
                    }

                    // chrome.runtime
                    //   .sendMessage({ method: 'getFile' })
                    //   .then((e) => {
                    //     console.log(e);
                    //     const t = Uint8Array.from(e.arrayBuffer),
                    //       n = new File([t.buffer], e.fileName, { type: e.type }),
                    //       o = new DataTransfer();
                    //     o.items.add(n),
                    //       (i.files = o.files),
                    //       i.dispatchEvent(new Event('change', { bubbles: !0 }));
                    //   })
                    //   .catch((e) => {
                    //     i.dispatchEvent(new Event('change', { bubbles: !0 }));
                    //   });
                  });
              }}
            >
              LET'S DO IT!
            </button>
            <a
              id="login-button"
              href="https://simplify.jobs/auth/login?from=welcome"
              target="_blank"
              rel="noreferrer"
              className="w-1/2 shadow-sm items-center justify-center text-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-white bg-primary-dark hover:bg-primary-base focus:outline-none transition ease-in-out duration-150"
              style={{ display: 'none' }}
              aria-label="Log in"
            >
              Log in to apply
            </a>
            <a
              id="onboarding-button"
              href="https://simplify.jobs/onboarding"
              target="_blank"
              rel="noreferrer"
              className="w-1/2 shadow-sm items-center justify-center text-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded text-white bg-primary-dark hover:bg-primary-base focus:outline-none transition ease-in-out duration-150"
              style={{ display: 'none' }}
              aria-label="Onboarding"
            >
              Finish onboarding{' '}
            </a>
            <button
              type="button"
              className="w-1/2 items-center justify-center border-transparent text-sm underline text-gray-400 hover:text-gray-600 focus:outline-none transition ease-in-out duration-150"
              aria-label="Apply manually"
            >
              I'll apply manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

class SmartApplyAutofill extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    mountPoint.setAttribute('style', 'position: fixed; z-index: 10000;');
    const n = this.attachShadow({ mode: 'open' });

    const i = chrome.runtime.getURL('styles.css');
    const s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('href', i);
    n.appendChild(s);

    const style = document.createElement('style');
    style.innerHTML = `.CircularProgressbar{width:100%;vertical-align:middle}.CircularProgressbar .CircularProgressbar-path{stroke:#23a59b;stroke-linecap:round;transition:stroke-dashoffset .5s ease 0s}.CircularProgressbar .CircularProgressbar-trail{stroke:#d6d6d6;stroke-linecap:round}.CircularProgressbar .CircularProgressbar-text{fill:#23a59b;font-size:20px;dominant-baseline:middle;text-anchor:middle}.CircularProgressbar .CircularProgressbar-background{fill:#d6d6d6}.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background{fill:#23a59b}.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text{fill:#fff}.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path{stroke:#fff}.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail{stroke:transparent}`;
    n.appendChild(style);

    const a = document.createElement('style');
    a.textContent = '\n      :host {\n        all: initial;\n      }\n    ';
    n.appendChild(a), n.appendChild(mountPoint);

    render(<AutoFill />, mountPoint);
  }
}
window.customElements.define('smart-apply-autofill', SmartApplyAutofill);

const f = document.createElement('smart-apply-autofill');
f.setAttribute('id', 'smart-apply-autofill-id');
f.setAttribute(
  'style',
  'all: revert !important; zoom: initial !important; font-size: 100% !important;'
);
document.documentElement.appendChild(f);
