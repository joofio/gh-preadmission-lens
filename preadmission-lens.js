let pvData = pv;
let htmlData = html;

let epiData = epi;
let ipsData = ips;
let lang = "";

// Function to get the lens specification
let getSpecification = () => {
    return "1.0.0-preadmission-banner";
};

// Function to get the explanation of the lens
const getExplanation = (lang = "en") => {
    const explanations = {
        en: "This lens adds a warning banner for patients with heart failure taking Furosemide, and provides a link to a safety questionnaire.",
        pt: "Esta lente adiciona um banner de aviso para pacientes com insuficiência cardíaca que tomam Furosemida e fornece um link para um questionário de segurança.",
        es: "Esta lente agrega un banner de advertencia para pacientes con insuficiencia cardíaca que toman Furosemida y proporciona un enlace a un cuestionario de seguridad.",
        da: "Denne linse tilføjer en advarselsbanner for patienter med hjertesvigt, der tager Furosemid, og giver et link til et sikkerhedsspørgeskema.",
    };
    return explanations[lang] || explanations.en;
};

// Function to get the report of the lens
const getReport = (lang = "en") => {
    return {
        message: getExplanation(lang),
        status: "success", // or "error" or "warning"
    };
};

// Detect language from ePI
const detectLanguage = () => {
    epiData.entry?.forEach((entry) => {
        const res = entry.resource;
        if (res?.resourceType === "Composition" && res.language) {
            lang = res.language;
        }
    });

    if (!lang && epiData.language) {
        lang = epiData.language;
    }

    if (!lang) {
        lang = "en";
    }
};

const getBannerHTML = (language) => {
    const banners = {
        en: `
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
</div>`,
        pt: `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Aviso para pacientes com insuficiência cardíaca a tomar Furosemida</strong><br><br>
  A furosemida ajuda a reduzir a acumulação de fluidos, mas em alguns casos pode causar efeitos secundários graves que requerem atenção médica imediata. Pare de tomar e procure atendimento de emergência se sentir algum dos seguintes:
  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Tonturas graves ou desmaios</strong> – pode indicar pressão arterial baixa ou perda de fluidos</li>
    <li><strong>Cãibras musculares ou fraqueza</strong> – pode ser um sinal de baixo teor de potássio</li>
    <li><strong>Batimento cardíaco irregular ou rápido</strong> – pode indicar um desequilíbrio eletrolítico grave</li>
    <li><strong>Dor súbita no peito</strong> – possível complicação cardíaca</li>
    <li><strong>Confusão ou fadiga extrema</strong> – pode sinalizar baixo teor de sódio ou desidratação</li>
    <li><strong>Perda de audição ou zumbido nos ouvidos</strong> – raro mas grave em doses elevadas</li>
    <li><strong>Dificuldade em respirar ou inchaço do rosto/lábios</strong> – possível reação alérgica</li>
  </ul>
  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Contactar o Suporte de Emergência
  </button>
</div>`,
        es: `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Advertencia para pacientes con insuficiencia cardíaca que toman Furosemida</strong><br><br>
  La furosemida ayuda a reducir la acumulación de líquidos, pero en algunos casos puede causar efectos secundarios graves que requieren atención médica inmediata. Deje de tomarla y busque atención de emergencia si experimenta alguno de los siguientes:
  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Mareos intensos o desmayos</strong> – puede indicar presión arterial baja o pérdida de líquidos</li>
    <li><strong>Calambres o debilidad muscular</strong> – podría ser un signo de bajo nivel de potasio</li>
    <li><strong>Latidos cardíacos irregulares o rápidos</strong> – puede indicar un desequilibrio electrolítico grave</li>
    <li><strong>Dolor torácico repentino</strong> – posible complicación cardíaca</li>
    <li><strong>Confusión o fatiga extrema</strong> – puede indicar un nivel bajo de sodio o deshidratación</li>
    <li><strong>Pérdida de audición o zumbido en los oídos</strong> – raro pero grave en dosis altas</li>
    <li><strong>Dificultad para respirar o hinchazón de la cara/labios</strong> – posible reacción alérgica</li>
  </ul>
  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Contactar con el Soporte de Emergencia
  </button>
</div>`,
        da: `
<div class="alert-banner emergency-call preadmission-lens" style="background-color:#fff3cd;padding:1em;border:1px solid #f5c2c7;margin-bottom:1em;border-radius:5px;font-family:sans-serif;">
  <strong>⚠️ Advarsel til patienter med hjertesvigt, der tager Furosemid</strong><br><br>
  Furosemid hjælper med at reducere væskeophobning, men i nogle tilfælde kan det forårsage alvorlige bivirkninger, der kræver øjeblikkelig lægehjælp. Stop med at tage medicinen og søg akut lægehjælp, hvis du oplever noget af følgende:
  <ul style="margin-top: 1em; margin-bottom: 1em;">
    <li><strong>Alvorlig svimmelhed eller besvimelse</strong> – kan indikere lavt blodtryk eller væsketab</li>
    <li><strong>Muskelkramper eller -svaghed</strong> – kan være et tegn på lavt kalium</li>
    <li><strong>Uregelmæssig eller hurtig hjerterytme</strong> – kan indikere en alvorlig elektrolytforstyrrelse</li>
    <li><strong>Pludselig brystsmerter</strong> – mulig hjertekomplikation</li>
    <li><strong>Forvirring eller ekstrem træthed</strong> – kan signalere lavt natrium eller dehydrering</li>
    <li><strong>Høretab eller ringen for ørerne</strong> – sjælden, men alvorlig ved høje doser</li>
    <li><strong>Vejrtrækningsbesvær eller hævelse af ansigt/læber</strong> – mulig allergisk reaktion</li>
  </ul>
  <button onclick="callEmergencySupport()" style="background-color:#d9534f;color:white;padding:0.75em 1.5em;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">
    🚨 Kontakt Nødhjælp
  </button>
</div>`,
    };
    return banners[language] || banners.en;
};

const getEmergencyScript = () => {
    return `
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
};

const insertQuestionnaireLink = (
    listOfCategories,
    language,
    document,
    response
) => {
    let linkHTML = "https://example.org/questionnaire/high-risk";
    let shouldAppend = false; //for future usage
    let foundCategory = false;

    listOfCategories.forEach((className) => {
        if (
            response.includes(`class="${className}"`) ||
            response.includes(`class='${className}'`)
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

    // No matching category tags → inject banner at top
    if (!foundCategory) {
        const bannerDiv = document.createElement("div");
        bannerDiv.innerHTML = getBannerHTML(language);
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
        script.textContent = getEmergencyScript();
        document.body.appendChild(script);
    }

    // Clean head
    if (document.getElementsByTagName("head").length > 0) {
        document.getElementsByTagName("head")[0].remove();
    }

    // Extract HTML result
    if (document.getElementsByTagName("body").length > 0) {
        response = document.getElementsByTagName("body")[0].innerHTML;
    } else {
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
    let listOfCategoriesToSearch = [
        { code: "grav-5", system: "https://www.gravitatehealth.eu/sid/doc" },
    ]; //what to look in extensions -made up code because there is none

    // Match lists
    const BUNDLE_IDENTIFIER_LIST = ["epibundle-123", "epibundle-abc"];
    const PRODUCT_IDENTIFIER_LIST = ["CIT-204447", "RIS-197361"];

    let matchFound = false;

    detectLanguage();

    // Check bundle.identifier.value
    if (
        epiData.identifier &&
        BUNDLE_IDENTIFIER_LIST.includes(epiData.identifier.value)
    ) {
        matchFound = true;
    }

    // Check MedicinalProductDefinition.identifier.value
    epiData.entry.forEach((entry) => {
        const res = entry.resource;
        if (res?.resourceType === "MedicinalProductDefinition") {
            const ids = res.identifier || [];
            ids.forEach((id) => {
                if (PRODUCT_IDENTIFIER_LIST.includes(id.value)) {
                    matchFound = true;
                }
            });
        }
    });

    // ePI traslation from terminology codes to their human redable translations in the sections
    // in this case, if is does not find a place, adds it to the top of the ePI
    let compositions = 0;
    let categories = [];
    epiData.entry.forEach((entry) => {
        if (entry.resource.resourceType == "Composition") {
            compositions++;
            //Iterated through the Condition element searching for conditions
            entry.resource.extension.forEach((element) => {
                // Check if the position of the extension[1] is correct
                if (element.extension[1].url == "concept") {
                    // Search through the different terminologies that may be avaible to check in the condition
                    if (
                        element.extension[1].valueCodeableReference.concept !=
                        undefined
                    ) {
                        element.extension[1].valueCodeableReference.concept.coding.forEach(
                            (coding) => {
                                // Check if the code is in the list of categories to search
                                if (
                                    listOfCategoriesToSearch.some(
                                        (item) =>
                                            item.code === coding.code &&
                                            item.system === coding.system
                                    )
                                ) {
                                    // Check if the category is already in the list of categories
                                    categories.push(
                                        element.extension[0].valueString
                                    );

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
        return htmlData;
    } else {
        let response = htmlData;
        let document;

        if (typeof window === "undefined") {
            let jsdom = await import("jsdom");
            let { JSDOM } = jsdom;
            let dom = new JSDOM(htmlData);
            document = dom.window.document;
            return insertQuestionnaireLink(
                categories,
                lang,
                document,
                response
            );
        } else {
            document = window.document;
            return insertQuestionnaireLink(
                categories,
                lang,
                document,
                response
            );
        }
    }
};

return {
    enhance: enhance,
    getSpecification: getSpecification,
    explanation: (language) => getExplanation(language || lang || "en"),
    report: (language) => getReport(language || lang || "en"),
};