import React from "react";

import RecruitmentRequest from "../models/recruitmentRequest";

const RecruitmentRequestDisplay: React.FC<{
  recruitmentRequests: RecruitmentRequest[];
  canEditRequest: boolean;
  updateRecruitmentRequest: (requestId: string) => void;
  handleOnBack: () => void;
}> = ({
  recruitmentRequests,
  updateRecruitmentRequest,
  canEditRequest,
  handleOnBack,
}) => {
  return (
    <div style={{ margin: "0 30px 0 30px" }}>
      <h2>List of Recruitment Requests:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
          overflow: "scroll",
        }}
      >
        {recruitmentRequests.map((fr: RecruitmentRequest, i) => {
          const { requestingDept, eventId, jobTitle, jobDescript, status } = fr;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "dashed",
                maxWidth: "350px",
                minWidth: "200px",
                padding: "10px",
              }}
              key={i}
            >
              <div>
                <b>Requesting Department:</b> {requestingDept}
              </div>
              <div>
                <b>Event Reference:</b> {`${eventId.slice(0, 8)}`}
              </div>
              <div>
                <b>Requested Amount:</b> {jobTitle}
              </div>
              <div>
                <b>Reason:</b> {jobDescript}
              </div>
              <div>
                <b>Status:</b> {status}
              </div>
              {canEditRequest && (
                <div>
                  <button
                    onClick={() => updateRecruitmentRequest(fr.requestId)}
                  >
                    Edit Event
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={handleOnBack}>Back</button>
      </div>
    </div>
  );
};

export default RecruitmentRequestDisplay;
