export default class Loripsify{constructor(){this.api="https://loripsum.net/api/",this.defaultProxy="https://corsproxy.io/?",this._defaultContainerId="loremIpsum",this.injectSelfHTML().then((()=>this._init())).catch((n=>{}))}_init(){const n=n=>document.getElementById(n);this.defaultContainer=()=>n(this._defaultContainerId),this.drawer=n("loremDrawer"),this.buttons={a:{el:n("clearCheckboxes"),substr:"include"},b:n("generatePassage"),c:n("pulloutHandle")},this.addListeners(),this.drawer.querySelector("#includeCorsProxy").value=this.defaultProxy}setDrawerState(n){const[e,t,o]=[this.drawer.style,"-3px","-242px"];e.top=n?t:o}resetCheckboxes(n){let e;if(n){e=this.getHandleTo("#loremDrawer","checkbox",n);for(const n of e)n.checked=!1}else{e=this.getHandleTo("#loremDrawer","checkbox");for(const n of e)n.checked=!1}}interceptForm(n){n.preventDefault();const[e,t]=[this.getHandleTo("#loremDrawer input"),{main:[],options:[]}];for(const n of e)"checkbox"===n.type?n.checked&&t.options.push(n.id):t.main.push(n.value);return t}parseForm(n){let[e,t,o,l]=n.main;return this.proxy=l||this.defaultProxy,o=o?this.getRequestedDiv(o):this.makeNewDiv(),{container:o,endpoint:[e,{1:"short",2:"medium",3:"long",4:"verylong"}[t]||"medium",...n.options].join("/").replace(/include/g,"").toLowerCase()}}makeNewDiv(){let n;for(n=document.querySelector("#loremIpsum");!n;){n=document.querySelector("#loremIpsum"),n=document.querySelector("#loripsumContainer");break}return n||(n=document.createElement("div"),n.id=this._defaultContainerId,n.setAttribute("sandbox",""),document.getElementById("includeInjectContainer").value=`#${n.id}`,document.querySelector("body").appendChild(n))}getRequestedDiv(n){let e=document.querySelector(n);if(!e){const e=`Null return from queryselector: ${n}`;throw alert(e),new ReferenceError(e)}return e}fetchLoripsum(n){const e=this.proxy+this.api;return fetch(e+n).then((n=>n.text())).then((n=>n)).catch((n=>{alert("Bad API response! Check the console for more details")}))}getHandleTo(n,e,t){let o;if(t)o=document.querySelectorAll(`input[type="${e}"][id*="${t}"]`);else if(e)o=document.querySelectorAll(`${n} input[type="${e}"]`);else{if(!n)throw"No selector provided";o=document.querySelectorAll(n)}return o}addListeners(){this.buttons.a.el.addEventListener("click",(n=>{n.preventDefault(),this.resetCheckboxes(this.buttons.a.substr)})),this.buttons.b.addEventListener("click",(n=>{const e=this.interceptForm(n),t=this.parseForm(e);this.fetchLoripsum(t.endpoint).then((n=>{t.container.innerHTML=n}))})),this.buttons.c.addEventListener("mouseenter",(()=>{this.setDrawerState(1)})),this.drawer.addEventListener("mouseleave",(()=>{setTimeout((()=>this.setDrawerState(0)),200)}))}injectSelfHTML(n){return new Promise(((n,e)=>{try{const e=document.createElement("div");e.innerHTML='\n    <style>\n    .popout {\n      position: absolute;\n      z-index: 999;\n      top: -242px;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 300px;\n      background: linear-gradient(to bottom right, #d3d3d3a9, #f8f8f8a9);\n      color: #333333;\n      backdrop-filter: blur(2px);\n      border-radius: 3px;\n      transition: top 0.5s;\n    }\n    .popout .handle {\n      position: fixed;\n      bottom: -8.32%;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 96.5%;\n      height: 12px;\n      margin-top: 4px;\n      background-image: linear-gradient(to bottom, #d3d3d3a9, #f8f8f8a9);\n      border-radius: 0px 0px 12px 12px;\n      cursor: pointer;\n      padding: 4px;\n      border-width: 0 2px 2px 2px;\n      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);\n    }\n    .popout .handle:hover {\n      background-color: #ffc107;\n      border-top: 1px solid #e6f1f6;\n    }\n    .popout .container {\n      display: flex;\n      flex-wrap: wrap;\n      font-family: system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto,\n        Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif;\n      letter-spacing: 0;\n      line-height: 0.5em;\n      font-weight: 450;\n    }\n    .popout .form {\n      margin: 16px;\n      display: flex;\n    }\n    .popout .form legend {\n      margin-bottom: 0.3em;\n      text-decoration: underline;\n      font-weight: 600;\n    }\n    .popout .label-row {\n      display: flex;\n      align-items: center;\n    }\n    .popout .form .checkboxes {\n      flex: 1 0 45%;\n    }\n    .popout .form .divider {\n      flex: 0 0 1%;\n      margin-right: 12px;\n      background-color: #e6f1f6;\n      box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.5);\n      filter: blur(1px);\n    }\n    .popout .form .required {\n      flex: 1 0 49.5%;\n    }\n    .popout .form .plaintext-toggle {\n      position: fixed;\n      bottom: 10%;\n      right: 0;\n      margin: 16px;\n    }\n    .popout .form input[type="text"],\n    .popout .form input[type="range"] {\n      width: 100%;\n      margin: 5px auto;\n    }\n    .popout .form .additional-options {\n      margin-top: 8px;\n    }\n    .popout .submit-button {\n      position: fixed;\n      bottom: 0;\n      right: 0;\n      margin: 16px;\n    }\n    .popout button {\n      color: #333333;\n      background-color: #e6f1f6;\n      border: 3px solid #ffc10734;\n      border-radius: 6px;\n      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\n      cursor: pointer;\n    }\n    .popout button:hover {\n      background-color: #d3dee4;\n      border-color: #ffc1076c;\n    }    \n    </style>\n    <div id="loremDrawer" class="popout">\n      <div class="container">\n        <span id="pulloutHandle" class="handle"></span>\n        <form class="form">\n          <div class="checkboxes">\n            <legend>Optional:</legend>\n            <span class="label-row">\n              <input type="checkbox" id="includeBq" />\n              <label for="includeBq">Blockquote</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeAllCaps" />\n              <label for="includeAllCaps">Capitalize</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeCode" />\n              <label for="includeCode">Code (pre)</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeDeco" />\n              <label for="includeDeco">Decorate</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeHeaders" />\n              <label for="includeHeaders">Headers</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeLink" />\n              <label for="includeLink">Links</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeDl" />\n              <label for="includeDl">List (dl)</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeNl" />\n              <label for="includeNl">List (ol)</label>\n            </span>\n            <span class="label-row">\n              <input type="checkbox" id="includeUl" />\n              <label for="includeUl">List (ul)</label>\n            </span>\n            <span class="label-row">\n              <button id="clearCheckboxes">Clear</button>\n            </span>\n          </div>\n          <div class="divider"></div>\n          <div class="required">\n            <span class="sliders">\n              <label>Paragraphs</label\n              ><input\n                type="range"\n                id="includeNumParagraphs"\n                min="1"\n                max="20"\n                value="3"\n                list="paragraph-integer"\n              />\n              <label>Length</label\n              ><input\n                type="range"\n                id="includeNumParagraphsLen"\n                min="1"\n                max="4"\n                value="2"\n                list="passage-length"\n              />\n              <datalist id="paragraph-integer">\n                <option value="1">1</option>\n                <option value="10">10</option>\n                <option value="20">20</option>\n              </datalist>\n              <datalist id="passage-length">\n                <option value="1">Short</option>\n                <option value="2">Medium</option>\n                <option value="3">Long</option>\n                <option value="4">Verylong</option>\n              </datalist>\n            </span>\n            <div class="additional-options">\n              <span class="text-input">\n                <label for="includeInjectContainer">Target Container</label>\n                <input\n                  type="text"\n                  id="includeInjectContainer"\n                  placeholder="Selector Query"\n                />\n              </span>\n              <span class="text-input">\n                <label for="includeCorsProxy">CORS Proxy</label>\n                <input\n                  type="text"\n                  id="includeCorsProxy"\n                  placeholder="https://my.cors.now/?"\n                  value=""\n                />\n              </span>\n            </div>\n            <span class="plaintext-toggle">\n              <label>Plaintext</label>\n              <input type="checkbox" id="includePlaintext" />\n            </span>\n            <button id="generatePassage" class="submit-button">\n              Generate Passage\n            </button>\n          </div>\n        </form>\n      </div>\n    </div>\n    ',e.id="LoremInjector",document.body.appendChild(e),n("PASS: HTML Injection")}catch(n){e("FAIL: HTML Injection")}}))}}