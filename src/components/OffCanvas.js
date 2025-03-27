import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GRAPHKEYS } from '../utils/constatnts'
import { useState } from "react";
const OffCanvas = ({
    isVisible,
    onClose,
    selectedFilter,
    users,
    data,
    handleProjectChange,
    onChange,
    handleReset,
    handleSubmit,
    handleDateChange,
}) => {
    console.log("===selectedFilter.keyselectedFilter.key",selectedFilter.key);
    
    const [dateError, setDateError] = useState("");
    const [disable, setDesable] = useState(false)
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <input
            ref={ref}
            value={value}
            onClick={onClick}
            style={{
                height: "40px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "5px 10px",
                fontSize: "14px",
            }}
        />
    ));

    const validateDateRange = (dates) => {

        const [start, end] = dates;
        if ((start && !end) || (!start && end)) {
            setDesable(true)
            setDateError("Both start and end dates are required.");
        } else {
            setDesable(false)
            setDateError("");
        }
    };
    const handleClear = () => {
        handleReset();
        setDesable(false)
        setDateError("");
        onClose();
    };
    return (
        isVisible && (
            <div
                className="offcanvas offcanvas-end show"
                tabIndex="-1"
                style={{ zIndex: 1050, maxWidth: "400px" }}
            >
                <div
                    className="offcanvas-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px",
                        marginTop: "19px",
                    }}
                >
                    <div
                        style={{
                            margin: 0,
                            fontSize: "15px",
                            fontWeight: "bold",
                            flex: 1,
                            textAlign: "left",
                            wordBreak: "break-word",
                            paddingBottom: "8px",
                            borderBottom: "1px solid #dcdcdc",
                        }}
                    >
                        {selectedFilter && selectedFilter.initiatedBy}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            color: "#333",
                            cursor: "pointer",
                            position: "absolute",
                            top: "25px",
                            right: "15px",
                        }}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <div className="offcanvas-body" style={{ padding: "20px" }}>
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
                    >
                        {selectedFilter.key !== GRAPHKEYS.ISSUSE_SEVERITY_FREQUESCY_PROJECT && selectedFilter.key !== GRAPHKEYS.MONTH_USAGE && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label
                                    htmlFor="filterSelect"
                                    style={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}
                                >
                                    Project Name
                                </label>
                                <select
                                    id="filterSelect"
                                    name="project_name"
                                    onChange={(e) => {
                                        onChange(e);
                                        handleProjectChange(e.target.value);
                                    }}
                                    style={{
                                        height: "40px",
                                        width: "100%",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        padding: "5px 10px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <option value="" hidden>
                                        Select a Project
                                    </option>
                                    {data?.project_user_mapping?.map((project) => (
                                        <option key={project._id} value={project._id}>
                                            {project.project_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {selectedFilter?.key !== GRAPHKEYS.ISSUE_SEVERITY_DISTRIBUTION &&
                            selectedFilter?.key !== GRAPHKEYS.ISSUSE_SEVERITY_FREQUESCY_PROJECT && selectedFilter.key !== GRAPHKEYS.MONTH_USAGE && selectedFilter.key !== GRAPHKEYS.AVARAGE_CODE_QUALITY && selectedFilter.key !== GRAPHKEYS.AVARAGE_CODE_SEVERITY && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                    <label
                                        htmlFor="userSelect"
                                        style={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}
                                    >
                                        Developer
                                    </label>
                                    <select
                                        id="userSelect"
                                        name="user_id"
                                        onChange={onChange}
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            padding: "5px 10px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <option value="" hidden>
                                            Select a Developer
                                        </option>
                                        {users?.map((user) => (
                                            <option key={user.user_id} value={user.user_id}>
                                                {user.full_name || user.email || user.user_id}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        {(selectedFilter.key === GRAPHKEYS.TEST_CASES_METRICS) || (selectedFilter.key === GRAPHKEYS.HTTP_METHOD_METRICS) && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label
                                    htmlFor="filterSelect"
                                    style={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}
                                >
                                    Select Filter
                                </label>
                                <select
                                    id="filterSelect"
                                    name="time_unit"
                                    onChange={onChange}
                                    style={{
                                        height: "40px",
                                        width: "100%",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        padding: "5px 10px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <option value="" hidden>
                                        Select a Filter
                                    </option>
                                    <option value="day">Day</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                </select>
                            </div>
                        )}
                        {((selectedFilter.key === GRAPHKEYS.COMMIT_AVARAGE_CODE_QUALITY) || (selectedFilter.key === GRAPHKEYS.COMMIT_VIOLATE) ||
                            (selectedFilter.key === GRAPHKEYS.COMMIT_ISSUE_SEVERITY_BY_USER_PROJECT || selectedFilter.key === GRAPHKEYS.COMMIT_ORG_COMMIT_METRICS) ||
                            (selectedFilter.key === GRAPHKEYS.TEST_CASES_METRICS) || (selectedFilter.key === GRAPHKEYS.HTTP_METHOD_METRICS)) && (
                                <div style={{
                                    display: "flex", flexDirection: "column", gap: "5px", fontSize: "14px", fontWeight: "bold", height: "40px",
                                    width: "100%"
                                }}>
                                    <label htmlFor="dateRange" className="form-label" data-testid="date-picker">
                                        Select Date Range:
                                    </label>
                                    <DatePicker
                                        selectsRange
                                        startDate={selectedFilter.start_date ? new Date(selectedFilter.start_date) : ''}
                                        endDate={selectedFilter.end_date ? new Date(selectedFilter.end_date) : ''}
                                        onChange={(dates) => {
                                            const [start, end] = dates;
                                            validateDateRange(dates);
                                            const formattedStartDate = start ? start.toLocaleDateString("en-CA") : "";
                                            const formattedEndDate = end ? end.toLocaleDateString("en-CA") : "";
                                            onChange({ target: { name: "start_date", value: formattedStartDate } });
                                            onChange({ target: { name: "end_date", value: formattedEndDate } });
                                        }}
                                        format="YYYY-MM-DD"
                                        placeholderText="Select date range"
                                        customInput={<CustomInput />}
                                    />
                                    {dateError && <span style={{ color: "red", fontSize: "12px" }}>{dateError}</span>}

                                </div>
                            )}

                        {(selectedFilter.key === GRAPHKEYS.ISSUSE_SEVERITY_FREQUESCY_PROJECT || selectedFilter.key === GRAPHKEYS.REVIEW_USAGE_DATA || selectedFilter.key === GRAPHKEYS.ASSIANCE_USAGE_DTA
                            || selectedFilter.key === GRAPHKEYS.MONTH_USAGE) && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                    <label
                                        htmlFor="date"
                                        style={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}
                                    >
                                        Select Month
                                    </label>
                                    <DatePicker
                                        selected={
                                            selectedFilter.date
                                                ? (() => {
                                                    let [year, month] = selectedFilter.date.split("-");
                                                    return new Date(Number(year), Number(month) - 1);
                                                })()
                                                : null
                                        }
                                        onChange={handleDateChange}
                                        name="date"
                                        dateFormat="yyyy-MM"
                                        showMonthYearPicker
                                        customInput={<CustomInput />}
                                    />


                                </div>
                            )}

                        <div
                            className="offcanvas-footer"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                padding: "10px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                                backgroundColor: "#fff",
                                boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <button
                                type="submit"
                                data-testid="submit-button"
                                disabled={disable}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    backgroundColor: "#007bff",
                                    borderColor: "#007bff",
                                    color: "#fff",
                                    width: "35%",
                                    cursor: "pointer",
                                }}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                data-testid="reset-button"
                                onClick={handleClear}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "14px",
                                    borderRadius: "5px",
                                    backgroundColor: "#007bff",
                                    borderColor: "#007bff",
                                    color: "#fff",
                                    width: "35%",
                                    cursor: "pointer",
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

OffCanvas.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedFilter: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    handleProjectChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func.isRequired,
};

export default OffCanvas;