import React from "react";

import FinancialRequest from "../models/financialRequest";

const FinancialRequestDisplay: React.FC<{
  financialRequests: FinancialRequest[];
  canEditRequest: boolean;
  updateFinancialRequest: (requestId: string) => void;
  handleOnBack: () => void;
}> = ({
  financialRequests,
  updateFinancialRequest,
  canEditRequest,
  handleOnBack,
}) => {
  return (
    <div style={{ margin: "0 30px 0 30px" }}>
      <h2>List of Financial Requests:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
          overflow: "scroll",
        }}
      >
        {financialRequests.map((fr: FinancialRequest, i) => {
          const { requestingDept, eventId, requiredAmount, reason, status } =
            fr;
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
                <b>Event Reference:</b> {eventId}
              </div>
              <div>
                <b>Requested Amount:</b> {requiredAmount}
              </div>
              <div>
                <b>Reason:</b> {reason}
              </div>
              <div>
                <b>Status:</b> {status}
              </div>
              {canEditRequest && (
                <div>
                  <button onClick={() => updateFinancialRequest(fr.requestId)}>
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

export default FinancialRequestDisplay;
