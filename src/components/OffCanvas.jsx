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
    const [dateError, setDateError] = useState("");
    const [disable, setDesable] = useState(false)
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <input
            ref={ref}
            value={value}
            onClick={onClick}
            className="classlable" />
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
            >
                <div className="offcanvas-header">
                    <div className="title-header">
                        {selectedFilter && selectedFilter.initiatedBy}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="closebutton">
                        &times;
                    </button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}
                        className="classform">
                        {selectedFilter.key !== GRAPHKEYS.ISSUSE_SEVERITY_FREQUESCY_PROJECT && selectedFilter.key !== GRAPHKEYS.MONTH_USAGE && (
                            <div>
                                <label
                                    htmlFor="filterSelect"
                                    className="formlabels">
                                    Project Name
                                </label>
                                <select
                                    id="filterSelect"
                                    name="project_name"
                                    onChange={(e) => {
                                        onChange(e);
                                        handleProjectChange(e.target.value);
                                    }}
                                    className="classlable">
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
                                <div>
                                    <label
                                        htmlFor="userSelect"
                                        className="formlabels">
                                        Developer
                                    </label>
                                    <select
                                        id="userSelect"
                                        name="user_id"
                                        onChange={onChange}
                                        className="classlable">
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
                        {((selectedFilter.key === GRAPHKEYS.COMMIT_AVARAGE_CODE_QUALITY) || (selectedFilter.key === GRAPHKEYS.COMMIT_VIOLATE) ||
                            (selectedFilter.key === GRAPHKEYS.COMMIT_ISSUE_SEVERITY_BY_USER_PROJECT || selectedFilter.key === GRAPHKEYS.COMMIT_ORG_COMMIT_METRICS)) && (
                                <div className="daterange">
                                    <label htmlFor="dateRange" data-testid="date-picker">
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
                                    {dateError && <span className="errormessage">{dateError}</span>}

                                </div>
                            )}
                        {(selectedFilter.key === GRAPHKEYS.ISSUSE_SEVERITY_FREQUESCY_PROJECT || selectedFilter.key === GRAPHKEYS.REVIEW_USAGE_DATA || selectedFilter.key === GRAPHKEYS.ASSIANCE_USAGE_DTA
                            || selectedFilter.key === GRAPHKEYS.MONTH_USAGE) && (
                                <div className="monthlabel">
                                    <label htmlFor="date" className="formlabels">
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
                                        customInput={<CustomInput />} />
                                </div>
                            )}
                        <div className="offcanvas-footer">
                            <button
                                type="submit"
                                data-testid="submit-button"
                                disabled={disable}
                                className="subresbutton"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                data-testid="reset-button"
                                onClick={handleClear}
                                className="subresbutton"
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