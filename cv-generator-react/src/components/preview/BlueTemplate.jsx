// src/components/preview/BlueTemplate.jsx
function BlueTemplate({
  fullName,
  jobTitle,
  headerLine,
  summary,
  expList,
  eduList,
  skillList,
  langList,
  linkList,
  withPhoto,
  photoUrl,
  contact,
}) {
  return (
    <div className="tpl-blue">
      <div className="blue-sidebar">
        {withPhoto && photoUrl && (
          <img src={photoUrl} alt="Profile" className="blue-photo" />
        )}
        <div className="blue-contact">
          <h3>Contact</h3>
          {contact.email && <p>{contact.email}</p>}
          {contact.phone && <p>{contact.phone}</p>}
          {contact.city && contact.country && (
            <p>
              {contact.city}, {contact.country}
            </p>
          )}
        </div>
        {skillList.length > 0 && (
          <div className="blue-skills">
            <h3>Skills</h3>
            <ul>
              {skillList.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {langList.length > 0 && (
          <div className="blue-languages">
            <h3>Languages</h3>
            <ul>
              {langList.map((l) => (
                <li key={l.id}>
                  {l.name} ({l.level})
                </li>
              ))}
            </ul>
          </div>
        )}
        {linkList.length > 0 && (
          <div className="blue-links">
            <h3>Links</h3>
            <ul>
              {linkList.map((l) => (
                <li key={l.id}>
                  <a href={l.url}>{l.title || "Link"}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="blue-main">
        <div className="blue-header">
          <h1>{fullName}</h1>
          <h2>{jobTitle}</h2>
          <p>{headerLine}</p>
        </div>
        {summary && (
          <div className="blue-section">
            <h3>Professional Summary</h3>
            <p>{summary}</p>
          </div>
        )}
        {expList.length > 0 && (
          <div className="blue-section">
            <h3>Professional Experience</h3>
            {expList.map((e) => (
              <div key={e.id} className="blue-exp">
                <div className="blue-exp-header">
                  <strong>{e.title || "Role"}</strong>
                  <span>
                    {e.start} — {e.end}
                  </span>
                </div>
                <em>
                  {e.company || "Company"}, {e.location}
                </em>
                {e.desc && (
                  <ul>
                    {e.desc
                      .split("\n")
                      .filter(Boolean)
                      .map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {eduList.length > 0 && (
          <div className="blue-section">
            <h3>Education</h3>
            {eduList.map((e) => (
              <div key={e.id} className="blue-edu">
                <div className="blue-edu-header">
                  <strong>{e.degree || "Degree"}</strong>
                  <span>
                    {e.start} — {e.end}
                  </span>
                </div>
                <em>
                  {e.school || "Institution"}, {e.location}
                </em>
                {e.desc && <p>{e.desc}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlueTemplate;
