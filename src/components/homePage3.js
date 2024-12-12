import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { sweetalert } from "../utils/constatnts";
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
  const isInitialCall = useRef(true);

  const data = useSelector((state) => state.graphsData.graphData);
  useEffect(() => {
    if (isInitialCall.current) {
      isInitialCall.current = false;
      dispatch(fetchGraphList()).then((d) => {
        if (d.status != 200) {
          Swal.fire({
            title: sweetalert.ERROR_CONFIRMED_TEXT,
            text: d?.response?.data?.detail || 'Something went wrong',
            icon: sweetalert.ERROR_ICON,
            confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT
          });
        }
      }).catch((e) => {
        Swal.fire({
          title: sweetalert.ERROR_CONFIRMED_TEXT,
          text: 'Internal server Error',
          icon: sweetalert.ERROR_ICON,
          confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT
        });;
      })
    }
  }, []);
  const transformMetricsName = (metricsName) => {
    if (!metricsName) return "";
    return metricsName
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim();
      };
  const processMetricsData = (data) => {
    return (data || []).map((item) => ({
      ...item,
      metrics_name: transformMetricsName(item?.metrics_name),
    }));
  };
  const processedData = processMetricsData(data && data[0]);
  const AssistanceData = processMetricsData(data && data[1]);
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
            <div className="m-5 container-fluid">
              <h4>Genie Metrics</h4>
              <div className="col-12 col-md-12 mb-2">
                <ResponsiveContainer width="90%" height={350}>
                  <BarChart
                    data={processedData}
                    margin={{ top: 20, right: 30, left: 50, bottom: 80 }}
                    barCategoryGap="20%"
                  >
                    <XAxis
                      dataKey="metrics_name"
                      fontSize={12}
                      tick={{ angle: -30, textAnchor: "end" }}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      formatter={(value, name, props) => [
                        value,
                        processedData[props.index]?.metrics_name || name,
                      ]}
                    />
                    <Bar dataKey="count" fill="#07439C">
                      {processedData.map((entry, index) => (
                        <Bar key={`bar-${index}`} dataKey="count" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="container-fluid  m-5">
              <h4 >Review Metrics</h4>
              <ResponsiveContainer width="50%" height={350}>
                <BarChart
                  data={AssistanceData}
                  margin={{ right: 30, left: 60, bottom: 80 }}
                  barCategoryGap="20%"
                >
                  <XAxis
                    dataKey="metrics_name"
                    fontSize={11}
                    tick={{ angle: -30, textAnchor: "end" }}
                    interval={0}
                  />
                  <YAxis
                    tickFormatter={(value) => value.toLocaleString()}
                    tick={{ fontSize: 12, angle: 0, textAnchor: "end" }}
                    label={{
                      value: "Number of Issues",
                      angle: -89,
                      position: 'middle',
                      fontSize: 17,
                      fill: "#333",
                      dx: -20
                    }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    formatter={(value, name, props) => [
                      value,
                      AssistanceData[props.index]?.metrics_name || name,
                    ]}
                  />
                  <Bar dataKey="total_issues" fill="#07439C">
                    {AssistanceData.map((entry, index) => (
                      <Bar key={`bar-${index}`} dataKey="count" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded">
        <span
          style={{
            color: "white",
          }}
        >
          {footerTextSamples.BILVANTIS}
        </span>
      </div>
    </Container>
  );
}