import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const OffCanvas = ({
    isVisible,
    onClose,
    onClear,
    selectedFilter,
    users,
    data,
    handleProjectChange,
    onChange,
    handleReset,
    handleSubmit,
    handleDateChange,
}) => {
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
    const handleClear = () => {
        handleReset();
        selectedFilter.project_name = ""
        onClose();
    };
    return (
        isVisible && (
            <div
                className="offcanvas offcanvas-end show"
                tabIndex="-1"
                style={{ zIndex: 1050, maxWidth: "400px"}}
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
                    <h5
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
                        {selectedFilter.initiatedBy}
                    </h5>
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
                        {selectedFilter.key !== "issue_severity_frequency_by_project" && selectedFilter.key !== "monthly_usage" && (
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
                        {selectedFilter?.key !== "issue_severity_distribution" &&
                            selectedFilter?.key !== "issue_severity_frequency_by_project" && selectedFilter.key !== "monthly_usage" && selectedFilter.key !== "avg_code_quality" && selectedFilter.key !== "avg_code_severity" && (
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
                        {(selectedFilter.key === "issue_severity_frequency_by_project" || selectedFilter.key === "review_usage_data" || selectedFilter.key === "assistant_usage_data" || selectedFilter.key === "monthly_usage") && (
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
                        <div style={{ display: "flex", gap: "30%", marginTop: '70%' }}>
                            <button
                                type="submit"
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