import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { fetchGraphList } from "../actions/graphsDataActions";
import { footerTextSamples } from "../utils/constatnts";

export function HomePage3() {
  const dispatch = useDispatch();
  const location = useLocation();
  const header = location.state?.header || "Metrics";

  const data = useSelector((state) => state.graphsData.graphData);

  useEffect(() => {
    dispatch(fetchGraphList());
  }, [dispatch]);

  const processedData = (data || []).map((item) => ({
    ...item,
    fill: item.metrics_name === "no_of_security_reviews" ? "red" : "#4451E9",
  }));

  return (
    <Container className="w-100" fluid style={{ height: "100vh" }}>
      <Row style={{ height: "10vh" }}>
        <HeaderComponent />
      </Row>
      <div className="w-100 mt-3" style={{ height: "82vh" }}>
        <div style={{ width: "10%" }}>
          <BootstrapSidebar />
        </div>
        <div className="col-11 h-100 ms-5 mb-5 pb-4">
          <div
            className="card d-flex h-100 question-card ms-4"
            style={{ overflowY: "scroll" }}
          >
            <div className="dashboard-container mt-3 container-fluid">
              <h4>{header}</h4>
              <div className="top-charts-container row">
                <div className="col-12 col-md-12 mb-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={processedData}
                      margin={{ top: 20, right: 30, left: 30, bottom: 80 }}
                      barCategoryGap="20%"
                    >
                      <XAxis
                        dataKey="metrics_name"
                        fontSize={13}
                        tick={{ angle: -30, textAnchor: "end" }}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip cursor={{ fill: "transparent" }} />
                      <Bar
                        dataKey="count"
                        isAnimationActive={false}
                        fill="#4451E9"
                        name="Metrics"
                      >
                        {processedData.map((entry, index) => (
                          <Bar
                            key={`bar-${index}`}
                            dataKey="count"
                            fill={entry.fill}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded">
        <span
          style={{
            color: "white",
          }}>
          {footerTextSamples.BILVANTIS}
        </span>
      </div>
    </Container>
  );
}
