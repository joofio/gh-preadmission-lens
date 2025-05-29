let pvData = pv;
let htmlData = html;

let epiData = epi;
let ipsData = ips;

let getSpecification = () => {
    return "1.0.0-preadmission-banner";
};
//document, htmlData, bannerHTML
//
const insertQuestionnaireLink = (listOfCategories, language, document, response) => {

    if (language?.startsWith("pt")) {
        linkHTML = "https://example.org/questionnaire/high-risk";

    } else if (language?.startsWith("en")) {
        linkHTML = "https://example.org/questionnaire/high-risk";

    } else if (language?.startsWith("es")) {
        linkHTML = "https://example.org/questionnaire/high-risk";

    } else if (language?.startsWith("da")) {
        linkHTML = "https://example.org/questionnaire/high-risk";

    } else {
        linkHTML = "https://example.org/questionnaire/high-risk";

    }
    let shouldAppend = false; //for future usage
    let foundCategory = false;
    console.log(listOfCategories)
    console.log(listOfCategories.length)
    listOfCategories.forEach((className) => {
        if (
            response.includes(`class="${className}`) ||
            response.includes(`class='${className}`)
        ) {
            const elements = document.getElementsByClassName(className);
            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                const link = document.createElement("a");
                link.setAttribute("href", linkHTML);
                link.setAttribute("target", "_blank");
                link.setAttribute("class", "preadmission-lens");

                if (shouldAppend) {
                    // Append the link as a new element inside the existing element
                    link.innerHTML = "📝 Fill out safety questionnaire";
                    el.appendChild(link);
                } else {
                    // Wrap the existing contents of the element in the link
                    link.innerHTML = el.innerHTML;
                    el.innerHTML = "";
                    el.appendChild(link);
                }
            }
            foundCategory = true;
        }
    });

    console.log (foundCategory);
    // No matching category tags → inject banner at top
    if (!foundCategory) {

        const bannerDiv = document.createElement("div");

        if (language?.startsWith("pt")) {
            bannerDiv.innerHTML = `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Warning for patients with heart failure taking Furosemide</strong><br><br>

  Furosemide helps reduce fluid buildup, but in some cases it may cause serious side effects that require immediate medical attention. Please stop and seek emergency care if you experience any of the following:

  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Severe dizziness or fainting</strong> – may indicate low blood pressure or fluid loss</li>
    <li><strong>Muscle cramps or weakness</strong> – could be a sign of low potassium</li>
    <li><strong>Irregular or fast heartbeat</strong> – may indicate a serious electrolyte imbalance</li>
    <li><strong>Sudden chest pain</strong> – possible cardiac complication</li>
    <li><strong>Confusion or extreme fatigue</strong> – may signal low sodium or dehydration</li>
    <li><strong>Hearing loss or ringing in the ears</strong> – rare but serious at high doses</li>
    <li><strong>Trouble breathing or swelling of the face/lips</strong> – possible allergic reaction</li>
  </ul>

  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Contact Emergency Support
  </button>
</div>
      `;

        } else if (language?.startsWith("en")) {
            bannerDiv.innerHTML = `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Warning for patients with heart failure taking Furosemide</strong><br><br>

  Furosemide helps reduce fluid buildup, but in some cases it may cause serious side effects that require immediate medical attention. Please stop and seek emergency care if you experience any of the following:

  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Severe dizziness or fainting</strong> – may indicate low blood pressure or fluid loss</li>
    <li><strong>Muscle cramps or weakness</strong> – could be a sign of low potassium</li>
    <li><strong>Irregular or fast heartbeat</strong> – may indicate a serious electrolyte imbalance</li>
    <li><strong>Sudden chest pain</strong> – possible cardiac complication</li>
    <li><strong>Confusion or extreme fatigue</strong> – may signal low sodium or dehydration</li>
    <li><strong>Hearing loss or ringing in the ears</strong> – rare but serious at high doses</li>
    <li><strong>Trouble breathing or swelling of the face/lips</strong> – possible allergic reaction</li>
  </ul>

  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Contact Emergency Support
  </button>
</div>
      `;

        } else if (language?.startsWith("es")) {
            bannerDiv.innerHTML = `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Warning for patients with heart failure taking Furosemide</strong><br><br>

  Furosemide helps reduce fluid buildup, but in some cases it may cause serious side effects that require immediate medical attention. Please stop and seek emergency care if you experience any of the following:

  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Severe dizziness or fainting</strong> – may indicate low blood pressure or fluid loss</li>
    <li><strong>Muscle cramps or weakness</strong> – could be a sign of low potassium</li>
    <li><strong>Irregular or fast heartbeat</strong> – may indicate a serious electrolyte imbalance</li>
    <li><strong>Sudden chest pain</strong> – possible cardiac complication</li>
    <li><strong>Confusion or extreme fatigue</strong> – may signal low sodium or dehydration</li>
    <li><strong>Hearing loss or ringing in the ears</strong> – rare but serious at high doses</li>
    <li><strong>Trouble breathing or swelling of the face/lips</strong> – possible allergic reaction</li>
  </ul>

  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Contact Emergency Support
  </button>
</div>
      `;
        } else if (language?.startsWith("da")) {
            bannerDiv.innerHTML = `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Warning for patients with heart failure taking Furosemide</strong><br><br>

  Furosemide helps reduce fluid buildup, but in some cases it may cause serious side effects that require immediate medical attention. Please stop and seek emergency care if you experience any of the following:

  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Severe dizziness or fainting</strong> – may indicate low blood pressure or fluid loss</li>
    <li><strong>Muscle cramps or weakness</strong> – could be a sign of low potassium</li>
    <li><strong>Irregular or fast heartbeat</strong> – may indicate a serious electrolyte imbalance</li>
    <li><strong>Sudden chest pain</strong> – possible cardiac complication</li>
    <li><strong>Confusion or extreme fatigue</strong> – may signal low sodium or dehydration</li>
    <li><strong>Hearing loss or ringing in the ears</strong> – rare but serious at high doses</li>
    <li><strong>Trouble breathing or swelling of the face/lips</strong> – possible allergic reaction</li>
  </ul>

  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Contact Emergency Support
  </button>
</div>
      `;
        } else {
            bannerDiv.innerHTML = `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Warning for patients with heart failure taking Furosemide</strong><br><br>

  Furosemide helps reduce fluid buildup, but in some cases it may cause serious side effects that require immediate medical attention. Please stop and seek emergency care if you experience any of the following:

  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Severe dizziness or fainting</strong> – may indicate low blood pressure or fluid loss</li>
    <li><strong>Muscle cramps or weakness</strong> – could be a sign of low potassium</li>
    <li><strong>Irregular or fast heartbeat</strong> – may indicate a serious electrolyte imbalance</li>
    <li><strong>Sudden chest pain</strong> – possible cardiac complication</li>
    <li><strong>Confusion or extreme fatigue</strong> – may signal low sodium or dehydration</li>
    <li><strong>Hearing loss or ringing in the ears</strong> – rare but serious at high doses</li>
    <li><strong>Trouble breathing or swelling of the face/lips</strong> – possible allergic reaction</li>
  </ul>

  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Contact Emergency Support
  </button>
</div>
      `;

        }

        const body = document.querySelector("body");
        if (body) {
            body.insertBefore(bannerDiv, body.firstChild);
        }
    }

    // ✅ Add the emergency script once, only if not already present
    if (!document.getElementById("call-emergency-script")) {
        const script = document.createElement("script");
        script.id = "call-emergency-script";
        script.type = "text/javascript";
        script.textContent = `
      function callEmergencySupport() {
        fetch("https://your-api.example.com/emergency", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            patientId: "123456",
            drug: "Furosemide",
            condition: "Heart Failure",
            timestamp: new Date().toISOString(),
            reason: "Emergency reaction reported via ePI alert"
          })
        })
        .then(response => {
          if (response.ok) {
            alert("Emergency support has been notified.");
          } else {
            alert("Could not contact support. Please call emergency services directly.");
          }
        })
        .catch(() => {
          alert("Network error. Please call emergency services directly.");
        });
      }
    `;
        document.body.appendChild(script);
    }


    // Clean head (same as your original logic)
    if (document.getElementsByTagName("head").length > 0) {
        document.getElementsByTagName("head")[0].remove();
    }

    // Extract HTML result
    if (document.getElementsByTagName("body").length > 0) {
        response = document.getElementsByTagName("body")[0].innerHTML;
        console.log("Response: " + response);
    } else {
        console.log("Response: " + document.documentElement.innerHTML);
        response = document.documentElement.innerHTML;
    }

    if (!response || response.trim() === "") {
        throw new Error("Annotation process failed: empty or null response");
    }

    return response;
};

let enhance = async () => {

    if (!epiData || !epiData.entry || epiData.entry.length === 0) {
        throw new Error("ePI is empty or invalid.");
    }
    let listOfCategoriesToSearch = [{ "code": "grav-5", "system": "https://www.gravitatehealth.eu/sid/doc" }]; //what to look in extensions -made up code because there is none

    // Match lists
    const BUNDLE_IDENTIFIER_LIST = ["epibundle-123", "epibundle-abc"];
    const PRODUCT_IDENTIFIER_LIST = ["CIT-204447", "RIS-197361"];


    let matchFound = false;
    let languageDetected = null;

    // 1. Check Composition.language
    epiData.entry?.forEach((entry) => {
        const res = entry.resource;
        if (res?.resourceType === "Composition" && res.language) {
            languageDetected = res.language;
            console.log("🌍 Detected from Composition.language:", languageDetected);
        }
    });

    // 2. If not found, check Bundle.language
    if (!languageDetected && epiData.language) {
        languageDetected = epiData.language;
        console.log("🌍 Detected from Bundle.language:", languageDetected);
    }

    // 3. Fallback message
    if (!languageDetected) {
        console.warn("⚠️ No language detected in Composition or Bundle.");
    }

    // Check bundle.identifier.value
    if (
        epiData.identifier &&
        BUNDLE_IDENTIFIER_LIST.includes(epiData.identifier.value)
    ) {
        console.log("🔗 Matched ePI Bundle.identifier:", epiData.identifier.value);
        matchFound = true;
    }

    // Check MedicinalProductDefinition.identifier.value
    epiData.entry.forEach((entry) => {
        const res = entry.resource;
        if (res?.resourceType === "MedicinalProductDefinition") {
            const ids = res.identifier || [];
            ids.forEach((id) => {
                if (PRODUCT_IDENTIFIER_LIST.includes(id.value)) {
                    console.log("💊 Matched MedicinalProductDefinition.identifier:", id.value);
                    matchFound = true;
                }
            });
        }
    });

    // ePI traslation from terminology codes to their human redable translations in the sections
    // in this case, if is does not find a place, adds it to the top of the ePI
    let compositions = 0;
    let categories = [];
    epi.entry.forEach((entry) => {
        if (entry.resource.resourceType == "Composition") {
            compositions++;
            //Iterated through the Condition element searching for conditions
            entry.resource.extension.forEach((element) => {

                // Check if the position of the extension[1] is correct
                if (element.extension[1].url == "concept") {
                    // Search through the different terminologies that may be avaible to check in the condition
                    if (element.extension[1].valueCodeableReference.concept != undefined) {
                        element.extension[1].valueCodeableReference.concept.coding.forEach(
                            (coding) => {
                                console.log("Extension: " + element.extension[0].valueString + ":" + coding.code)
                                // Check if the code is in the list of categories to search
                                if (listOfCategoriesToSearch.some(item => item.code === coding.code && item.system === coding.system)) {
                                    console.log("Found", element.extension[0].valueString)
                                    // Check if the category is already in the list of categories
                                    categories.push(element.extension[0].valueString);
                                }
                            }
                        );
                    }
                }
            });
        }
    });
    if (compositions == 0) {
        throw new Error('Bad ePI: no category "Composition" found');
    }

    if (!matchFound) {
        console.log("ePI is not for a high-risk side effect medication");
        return htmlData;
    }

    else {


        let response = htmlData;
        let document;

        if (typeof window === "undefined") {
            let jsdom = await import("jsdom");
            let { JSDOM } = jsdom;
            let dom = new JSDOM(htmlData);
            document = dom.window.document;
            return insertQuestionnaireLink(categories, languageDetected, document, response);
            //listOfCategories, enhanceTag, document, response
        } else {
            document = window.document;
            return insertQuestionnaireLink(categories, languageDetected, document, response);
        }
    };
};

return {
    enhance: enhance,
    getSpecification: getSpecification,
};
