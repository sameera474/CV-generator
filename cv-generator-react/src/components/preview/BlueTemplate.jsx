// src/components/preview/ClassicTemplate.jsx
function ClassicTemplate({
  fullName,
  jobTitle,
  headerLine,
  summary,
  expList,
  eduList,
  skillList,
  langList,
  linkList,
}) {
  return (
    <div className="tpl-classic">
      <div className="classic-header-line">{headerLine}</div>
      <h1 className="classic-name">{fullName}</h1>
      <div className="classic-title">{jobTitle}</div>

      <h2 className="classic-section-title">PROFESSIONAL SUMMARY</h2>
      <p className="classic-text">
        {summary ||
          "Quality driven QA/QC Engineer with over 7 years of experience in civil, structural and MEP works."}
      </p>

      {expList.length > 0 && (
        <>
          <h2 className="classic-section-title">PROFESSIONAL EXPERIENCE</h2>
          {expList.map((e) => (
            <div key={e.id} className="classic-exp">
              <div className="classic-exp-top">
                <div>
                  <strong>{e.title || "Role"}</strong>
                  <br />
                  <em>{e.company || "Company"}</em>
                </div>
                <div className="classic-exp-meta">
                  {e.start} — {e.end}
                  <br />
                  {e.location}
                </div>
              </div>
              {e.desc && (
                <ul className="classic-bullets">
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
        </>
      )}

      {eduList.length > 0 && (
        <>
          <h2 className="classic-section-title">EDUCATION</h2>
          {eduList.map((e) => (
            <div key={e.id} className="classic-exp">
              <div className="classic-exp-top">
                <div>
                  <strong>{e.degree || "Degree"}</strong>
                  <br />
                  <em>{e.school || "Institution"}</em>
                </div>
                <div className="classic-exp-meta">
                  {e.start} — {e.end}
                  <br />
                  {e.location}
                </div>
              </div>
              {e.desc && (
                <ul className="classic-bullets">
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
        </>
      )}

      {skillList.length > 0 && (
        <>
          <h2 className="classic-section-title">SKILLS</h2>
          <p className="classic-text">{skillList.join(", ")}</p>
        </>
      )}

      {langList.length > 0 && (
        <>
          <h2 className="classic-section-title">LANGUAGES</h2>
          <p className="classic-text">
            {langList.map((l) => `${l.name} (${l.level})`).join(", ")}
          </p>
        </>
      )}

      {linkList.length > 0 && (
        <>
          <h2 className="classic-section-title">LINKS</h2>
          <ul className="classic-bullets">
            {linkList.map((l) => (
              <li key={l.id}>
                {l.title || "Link"} – {l.url}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ClassicTemplate;
