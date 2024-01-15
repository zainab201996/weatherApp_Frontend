import { React } from "react";
import { Row, Col } from "antd";

const DateTimeComponent = ({ dateTime }) => {
  const timeStyle = {
    marginTop: "auto",
    fontSize: "4em",
    fontWeight: "400",
  };
  const dateStyle = {
    fontSize: "1.5em",
    fontWeight: "100",
  };
  const timeRowStyle = { height: "25%" };
  const dateRowStyle = { height: "10%" };
  const rootRowStyle = { height: "6em" };
  return (
    <Row className="dateTime" style={rootRowStyle}>
      <Col span={24} style={{ textAlign: "center" }}>
        <Row style={timeRowStyle}>
          <Col span={24}>
            {dateTime.time.split(":")[0] < 13 ? (
              <div>
                {dateTime.time.split(":")[0] > 11 ? (
                  <h1 style={timeStyle}>{dateTime.time} PM</h1>
                ) : (
                  <h1 style={timeStyle}>
                    {dateTime.time === "00:00" ? "12:00" : dateTime.time} AM
                  </h1>
                )}
              </div>
            ) : (
              <div>
                {dateTime.time.split(":")[0] > 11 ? (
                  <h1 style={timeStyle}>
                    {dateTime.time.split(":")[0] % 12}:
                    {dateTime.time.split(":")[1]} PM
                  </h1>
                ) : (
                  <h1 style={timeStyle}>
                    {" "}
                    {dateTime.time.split(":")[0] % 12}:
                    {dateTime.time.split(":")[1]} AM
                  </h1>
                )}
              </div>
            )}
          </Col>
        </Row>
        <Row style={dateRowStyle}>
          <Col span={24}>
            <h3 style={dateStyle}>{`${dateTime.date.toLocaleString("en-US", {
              month: "long",
            })} ${dateTime.date.getDate()}, ${dateTime.date.getFullYear()}`}</h3>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DateTimeComponent;
