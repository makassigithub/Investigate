const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
   <html>
        <body>
            <div style="text-align:center;">
                    <h3>I'd like your input</h3>
                    <p>Please answer the following questions</p>
                    <p>${survey.body}</p>
                <div style="display: flex; justify-content: "space-around">
                    <div>
                        <a href="${keys.emailRedirectDomain}/api/survey/thanks">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.emailRedirectDomain}/api/survey/thanks">No</a>
                    </div>
                </div>
            </div>
        </body>
   </html>
  `;
};
