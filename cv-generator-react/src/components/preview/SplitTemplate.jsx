// src/components/preview/BlueTemplate.jsx
function BlueTemplate({
  fullName,
  jobTitle,
  summary,
  withPhoto,
  photoUrl,
  contact,
  expList,
  eduList,
  skillList,
  langList,
}) {
  return (
    <div className="tpl-blue">
      <aside className="tpl-blue-sidebar">
        {withPhoto && photoUrl && (
          <img src={photoUrl} alt="profile" className="blue-photo" />
        )}
        <h1 className="blue-name">{fullName.toUpperCase()}</h1>

        <h2 className="blue-label">CONTACT</h2>
        <ul className="blue-list">
          {contact.email && <li>{contact.email}</li>}
          {contact.phone && <li>{contact.phone}</li>}
          {contact.address && (
            <li>
              {contact.address}
              {contact.city && `, ${contact.city}`}
            </li>
          )}
          {contact.country && <li>{contact.country}</li>}
        </ul>

        {skillList.length > 0 && (
          <>
            <h2 className="blue-label">SKILLS</h2>
            <ul className="blue-list">
              {skillList.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {langList.length > 0 && (
          <>
            <h2 className="blue-label">LANGUAGES</h2>
            <ul className="blue-list">
              {langList.map((l) => (
                <li key={l.id}>
                  {l.name} – {l.level}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <main className="tpl-blue-main">
        <div className="blue-job">{jobTitle}</div>

        {summary && (
          <>
            <h3 className="blue-section">SUMMARY</h3>
            <p className="blue-text">{summary}</p>
          </>
        )}

        {expList.length > 0 && (
          <>
            <h3 className="blue-section">EXPERIENCE</h3>
            {expList.map((e) => (
              <div key={e.id} className="blue-exp">
                <div className="blue-exp-top">
                  <div>
                    <span className="blue-role">{e.title || "Role"}</span>
                    <br />
                    <span className="blue-company">
                      {e.company || "Company"}
                    </span>
                  </div>
                  <div className="blue-exp-meta">
                    {e.location}
                    <br />
                    {e.start} — {e.end}
                  </div>
                </div>
                {e.desc && (
                  <ul className="blue-bullets">
                    {e.desc
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {eduList.length > 0 && (
          <>
            <h3 className="blue-section">EDUCATION</h3>
            {eduList.map((e) => (
              <div key={e.id} className="blue-exp">
                <div className="blue-exp-top">
                  <div>
                    <span className="blue-role">{e.degree || "Degree"}</span>
                    <br />
                    <span className="blue-company">
                      {e.school || "Institution"}
                    </span>
                  </div>
                  <div className="blue-exp-meta">
                    {e.location}
                    <br />
                    {e.start} — {e.end}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

export default BlueTemplate;
