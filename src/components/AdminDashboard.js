import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  flushDB,
  containerRestart,
  neo4jStatus,
  reloadData,
  changeStorage,
} from "../actions/adminActions";
import { toast } from "react-toastify";
import Switch from "@mui/material/Switch";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import edit from "../Assets/edit.svg";
import deleteicon from "../Assets/delete.svg";
import userApproveIcon from "../Assets/userApprove.svg";
import rejectIcon from "../Assets/rejectUser.svg";
import resetPass from "../Assets/resetPass.svg";
import {
  userList,
  pendingUserList,
  userApprove,
  userDelete,
  userReject,
  userRoleEdit,
  userResetPassword,
  getUserRoles,
} from "../actions/userActions";
import Swal from "sweetalert2";
import {
  showConfirmAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../utils/config";
import "../styles/AdminDashboard.css";
import DynamicTable from "./DynamicTable";
export function AdminDashboard() {
  const [activeadminTab, setadminActiveTab] = useState("adminUsers");
  const [userData, setUserData] = useState();
  const [modelFrom, setModelFrom] = useState("");
  const [modelHead, setModelHead] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [pendingCurrentPage, setPendingCurrentPage] = useState(1);
  const [pendingTotalPages, setPendingTotalPages] = useState(1);
  let [pendingUsers, setPendingUsers] = useState([]);
  let [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNeo4jOption, setSelectedNeo4jOption] = useState("True");
  const [storageOption, setStorageOption] = useState("local");
  const [isActive, setIsActive] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    role: "",
    company_name: "",
  });

  const pageSize = 10;
  // let roles = [{ id: '1', rolename: "super_user" }, { id: '2', rolename: "admin" }, { id: '3', rolename: "user" }]
  const dispatch = useDispatch();
  const tabStyle = (tabName) => ({
    color: activeTab === tabName ? "#07439C" : "#666666",
  });
  const admintabStyle = (tabName) => ({
    color: activeadminTab === tabName ? "#07439C" : "#666666",
  });

  const userDetails = useSelector((state) => state.usersList);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (userDetails?.roles?.data) {
      const updated = userDetails.roles.data.map((r, i) => ({
        id: (i + 1).toString(),
        rolename: r,
      }));

      setRoles(updated);
    }
  }, [userDetails]);

  const fetchUsers = async (page, formValues) => {
    setLoading(true);
    try {
   
      const response = await dispatch(
        userList({ page, page_size: pageSize, formValues })
      );
      const data = response?.data;
      setUsers(data.users || []);
      setTotalPages(data?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingUsers = async (page) => {
    setLoading(true);
    try {
      const response = await dispatch(
        pendingUserList({ page, page_size: pageSize })
      );
      const data = response?.data;
      setPendingUsers(data?.pending_users || []);
      setPendingTotalPages(data?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching pending users:", error);
    } finally {
      setLoading(false);
    }
  };
  const FullScreenLoader = () => (
    <div className="loader-overlay">
      <div className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  const userColumns =
    users.length > 0
      ? Object.keys(users[0])
          .filter((key) => key !== "id" && key !== "fullname")
          .map((key) => ({
            label: key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            accessor: key,
          }))
      : [];

  const pendingUserColumns =
    pendingUsers.length > 0
      ? Object.keys(pendingUsers[0])
          .filter((key) => key !== "id" && key !== "fullname")
          .map((key) => ({
            label: key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            accessor: key,
          }))
      : [];
  const neo4jStatusOptions = [
    { label: "Include All", value: "False" },
    { label: "Include Texts", value: "True" },
  ];
  const llmConfig = [
    { label: "OpenAI", value: "openai" },
    { label: "Gemini", value: "gemini" },
  ];
  const handleSelect = (value) => {
    setSelectedLLM(value);
  };
  const storageStatusOptions = [
    { label: "Local", value: "local" },
    { label: "S3", value: "s3" },
    { label: "Blob", value: "blob" },
    { label: "Google Storage Bucket", value: "google storage bucket" },
  ];
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers(currentPage, formValues);
    } else if (activeTab === "pendingUsers") {
      fetchPendingUsers(pendingCurrentPage);
    }
  }, [currentPage, pendingCurrentPage, activeTab]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, role, company_name } = formValues;

  // Check if all fields are empty
  if (!email.trim() && !role.trim() && !company_name.trim()) {
    setEmailError("Please enter at least one field: Email, Role, or Company Name.");
    return;
  }

    setEmailError("");
    setCurrentPage(1);
    fetchUsers(currentPage, formValues);
    setFormValues({ email: "", role: "", company_name: "" });
    setShowModal(false);
  };

  const [emailError, setEmailError] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    setFormValues({
      email: "",
      role: "",
      company_name: "",
    });
    setEmailError("");
  };

  const handleLLMSubmit = () => {
    const token = sessionStorage.getItem("access_token");

    const formData = new FormData();
    formData.append("new_llm_config", selectedLLM);

    fetch(process.env.REACT_APP_IP + "genieapi/update-llm-config", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((data) => {
        setSelectedLLM("");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "LLM configuration updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error("Error sending LLM to backend:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update LLM configuration. Please try again.",
        });
      });
  };
  const [roleError, setRoleError] = useState("");

  const onRoleChange = (e, user) => {
    let selectedProject = roles.find((role) => role.id === e.target.value);
    setRoleError("");
    setFormValues({ role: selectedProject.rolename });
    setUserData({
      role: selectedProject.rolename,
      roleId: e.target.value,
      userid: user.id,
    });
  };
  const onEditRole = (user) => {
    dispatch(getUserRoles());
    setModelFrom("User");
    setModelHead("Edit Role");
    setSelectedUser(user);
    setShowModal(true);
  };
  const approveUser = (user) => {
    setLoading(true);
    dispatch(userApprove(user.id))
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          showSuccessAlert("Success", "User approved successfully!");
          dispatch(userList());
          dispatch(pendingUserList());
        } else {
          showErrorAlert("Error", "Failed to approve user.");
        }
      })
      .catch(() => {
        showErrorAlert("Error", "Something went wrong.");
      });
  };
  const submitEditedRole = (user) => {
    if (!formValues.role) {
      setRoleError("Please select a role");
      return;
    }
    showConfirmAlert(
      "Edit",
      "Do you want to edit this user's role?",
      "Yes, Edit it!"
    ).then((result) => {
      if (result.isConfirmed) {
        setShowModal(true);
        setLoading(true);
        dispatch(userRoleEdit(user))
          .then((response) => {
            setLoading(false);
            setShowModal(false);
            if (response?.status === 200) {
              showSuccessAlert(
                "Success",
                "User role has been edited successfully!"
              );
              //   dispatch(userList());
              fetchUsers(currentPage);
              setFormValues({
                email: "",
                role: "",
                company_name: "",
              });
            } else {
              showErrorAlert("Error", "Failed to edit user role.");
            }
          })
          .catch(() => {
            showErrorAlert(
              "Error",
              "Something went wrong while editing the user role."
            );
          });
      } else {
        Swal.close();
      }
    });
  };
  const deleteUser = (user) => {
    showConfirmAlert(
      "Delete",
      "Do you want to delete this user?",
      "Yes, delete it!"
    ).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        dispatch(userDelete(user.id))
          .then((response) => {
            setLoading(false);
            if (response?.status === 200) {
              showSuccessAlert("Deleted!", "User has been deleted.");
              dispatch(userList());
            } else {
              showErrorAlert("Error", "Failed to delete user.");
            }
          })
          .catch(() => {
            showErrorAlert();
          });
      } else {
        Swal.close();
      }
    });
  };
  const rejectUser = (user) => {
    showConfirmAlert("Reject", "Do you want to reject this user?", "Yes!").then(
      (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          dispatch(userReject(user.id))
            .then((response) => {
              setLoading(false);
              if (response?.status === 200) {
                showSuccessAlert(
                  "Rejected!",
                  "User has been rejected successfully."
                );
                dispatch(userList());
                dispatch(pendingUserList());
              } else {
                showErrorAlert("Error", "Failed to reject user.");
              }
            })
            .catch(() => {
              showErrorAlert(
                "Error",
                "Something went wrong while rejecting the user."
              );
            });
        } else {
          Swal.close();
        }
      }
    );
  };
  const handlePageChange = (page) => {
    if (activeTab === "users" && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else if (
      activeTab === "pendingUsers" &&
      page >= 1 &&
      page <= pendingTotalPages
    ) {
      setPendingCurrentPage(page);
    }
  };
  const onResetPass = (user) => {
    setSelectedUser(user);
    setModelFrom("Reset");
    setModelHead("Reset Password");
    setShowModal(true);
  };
  const onPasswordChange = (e) => {
    setNewPassword({ new_password: e.target.value });
  };
  const resetPassWord = (user) => {
    setLoading(true);
    dispatch(userResetPassword(newPassword, selectedUser))
      .then((response) => {
        setShowModal(false);
        if (response?.status === 200) {
          setLoading(false);
          showSuccessAlert(
            "Reset Password",
            "Password has been reset successfully!"
          );
        } else {
          showErrorAlert("Error", "Failed to reset password.");
        }
      })
      .catch(() => {
        setShowModal(false);
        showErrorAlert();
      });
  };
  const onFilter = (e) => {
    setShowModal(true);
    setModelFrom("Filter");
    setModelHead("Filter");
  };
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleFlushDB = () => {
    dispatch(flushDB())
      .then((response) => response && toast.success(response.data))
      .catch(() => toast.error("Failed to flush database"));
  };
  const handleContainerRestart = () => {
    dispatch(containerRestart())
      .then(
        (response) =>
          response && toast.success("Application restarted successfully")
      )
      .catch(() => toast.error("Failed to restart application"));
  };
  const handleReload = () => {
    dispatch(reloadData())
      .then((response) => response && toast.success(response.data.message))
      .catch(() => toast.error("Failed to reload data"));
  };
  const handleToggle = (event) => {
    const newValue = event.target.checked;
    setIsActive(newValue);
    const formData = new FormData();
    formData.append("status", newValue ? "True" : "False");
    formData.append("texts", selectedNeo4jOption);
    dispatch(neo4jStatus(formData))
      .then((response) => response && toast.success(response.message))
      .catch(() => toast.error("Failed to update status"));
  };
  const handleStorageChange = (event) => {
    setStorageOption(event.target.value);
  };
  const handleReset = async (e) => {
    setLoading(true);
    try {
      setCurrentPage(1);
      let page = currentPage;
      const response = await dispatch(userList({ page, page_size: pageSize }));
      const data = response?.data;
      setUsers(data.users || []);
      setTotalPages(data?.total_pages || 1);
      setShowModal(false);
      setFormValues({ email: "", role: "", company_name: "" });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleStorageClick = () => {
    const formData = new FormData();
    formData.append("storage", storageOption);
    dispatch(changeStorage(formData))
      .then(
        (response) => response && toast.success("Storage updated successfully")
      )
      .catch(() => toast.error("Failed to update storage"));
  };
  return (
    <Container fluid className="w-90">
      <Row className="sticky-row">
        <HeaderComponent />
      </Row>
      <div className="flex-grow-1">
        <BootstrapSidebar />
      </div>
      <div className="row mb-2">
        {loading && <FullScreenLoader />}
        <ul className="nav" style={{ marginLeft: "6%" }}>
          <li className="nav-item">
            <button
              className="nav-link"
              style={admintabStyle("adminUsers")}
              onClick={() => setadminActiveTab("adminUsers")}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              style={admintabStyle("actions")}
              onClick={() => setadminActiveTab("actions")}
            >
              Actions
            </button>
          </li>
        </ul>
        <hr className="navBarAdmin"></hr>
        {activeadminTab === "adminUsers" ? (
          <>
            <ul
              className="nav d-flex w-100 position-relative"
              style={{ marginLeft: "6%" }}
            >
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={tabStyle("users")}
                  onClick={() => setActiveTab("users")}
                >
                  Active Users
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={tabStyle("pendingUsers")}
                  onClick={() => setActiveTab("pendingUsers")}
                >
                  Pending Users
                </button>
              </li>
              {activeTab === "users" && (
                <button
                  className="btn btn-outline-primary btn-sm position-absolute custom-action-button"
                  title="Filter"
                  onClick={(e) => onFilter(e)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#0d6efd";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#0d6efd";
                  }}
                >
                  <i className="bi bi-funnel-fill me-1"></i> Filter
                </button>
              )}
            </ul>
            <hr className="navBarAdmin"></hr>
            <div className="content" style={{ marginLeft: "6%" }}>
              {activeTab === "users" && (
                <div className="table-container" style={{ width: "94%" }}>
                  <DynamicTable
                    data={users}
                    columns={userColumns}
                    emptyMessage="No Users Found"
                    actions={[
                      {
                        label: "Edit",
                        icon: edit,
                        onClick: onEditRole,
                        title: "Edit Role",
                      },
                      {
                        label: "Delete",
                        icon: deleteicon,
                        onClick: deleteUser,
                        title: "Delete User",
                      },
                      {
                        label: "Reset",
                        icon: resetPass,
                        onClick: onResetPass,
                        title: "Reset Password",
                      },
                    ]}
                  />
                </div>
              )}

              {activeTab === "pendingUsers" && (
                <div className="table-container" style={{ width: "94%" }}>
                  <DynamicTable
                    data={pendingUsers}
                    columns={pendingUserColumns}
                    emptyMessage="No Pending Users"
                    actions={[
                      {
                        label: "Approve",
                        icon: userApproveIcon,
                        onClick: approveUser,
                        title: "Approve User",
                      },
                      {
                        label: "Reject",
                        icon: rejectIcon,
                        onClick: rejectUser,
                        title: "Reject User",
                      },
                    ]}
                  />
                </div>
              )}
            </div>
            <div
              className="pagination-controls fixed-pagination"
              style={{ width: "94%", marginLeft: "6%" }}
            >
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  handlePageChange(
                    activeTab === "users"
                      ? currentPage - 1
                      : pendingCurrentPage - 1
                  )
                }
                disabled={
                  activeTab === "users"
                    ? currentPage === 1
                    : pendingCurrentPage === 1
                }
              >
                Previous
              </button>
              <span style={{ fontSize: "0.85rem" }}>
                Page {activeTab === "users" ? currentPage : pendingCurrentPage}{" "}
                of {activeTab === "users" ? totalPages : pendingTotalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  handlePageChange(
                    activeTab === "users"
                      ? currentPage + 1
                      : pendingCurrentPage + 1
                  )
                }
                disabled={
                  activeTab === "users"
                    ? currentPage === totalPages
                    : pendingCurrentPage === pendingTotalPages
                }
              >
                Next
              </button>
            </div>
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              backdrop="static"
              keyboard={false}
              dialogClassName="custom-modal"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1050,
                margin: 0,
              }}
            >
              <Modal.Header>
                <Modal.Title>{modelHead}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {modelFrom === "Reset" ? (
                  <>
                    <p>User name : {selectedUser?.full_name}</p>
                    <label>New Password: </label>
                    <input
                      type="password"
                      className="password-input"
                      onChange={(e) => onPasswordChange(e, selectedUser)}
                    ></input>
                  </>
                ) : modelFrom === "User" ? (
                  <>
                    <p>User name : {selectedUser?.full_name}</p>
                    <select
                      id="roleSelect"
                      name="role"
                      onChange={(e) => onRoleChange(e, selectedUser)}
                      className="password-input"
                    >
                      <option value="" hidden>
                        Select a role
                      </option>
                      {roles?.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.rolename}
                        </option>
                      ))}
                    </select>
                    {roleError && (
                      <p className="text-danger mt-1 error-message">
                        {roleError}
                      </p>
                    )}
                  </>
                ) : modelFrom === "Filter" ? (
                  <form className="filter-form" onSubmit={handleSubmit}>
                   
                    <label htmlFor="emailfilter">Email:</label>
                    <input
                      type="text"
                      id="emailfilter"
                      name="email"
                      placeholder="Enter email"
                      value={formValues.email}
                      onChange={(e) => {
                        handleChange(e);
                        setEmailError("");
                      }}
                    />

                    

                    <label htmlFor="rolefilter">Role:</label>
                    <input
                      type="text"
                      id="rolefilter"
                      name="role"
                      placeholder="Enter role"
                      value={formValues.role}
                      onChange={(e) => {
                        handleChange(e);
                        setEmailError("");
                      }}
                    />

                    <label htmlFor="companyFilter">Company Name:</label>
                    <input
                      type="text"
                      id="companyFilter"
                      name="company_name"
                      placeholder="Enter company name"
                      value={formValues.company_name}
                       onChange={(e) => {
                        handleChange(e);
                        setEmailError("");
                      }}
                    />

                     {emailError && (
                      <p
                        className="text-danger mt-1 mb-error-message"
                      >
                        {emailError}
                      </p>
                    )}
                    <div className="d-flex gap-3 align-items-end">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                ) : (
                  ""
                )}
              </Modal.Body>
              <Modal.Footer>
                {modelFrom === "Reset" ? (
                  <Button
                    variant="primary"
                    onClick={(e) => resetPassWord(e)}
                    className="btn-primary-custom"
                  >
                    Reset
                  </Button>
                ) : modelFrom === "User" ? (
                  <Button
                    variant="primary"
                    onClick={(e) => submitEditedRole(userData)}
                    className="btn-primary-custom"
                  >
                    Submit
                  </Button>
                ) : (
                  ""
                )}
                {modelFrom !== "Filter" ? (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowModal(false);
                      setRoleError("");
                    }}
                    className="btn-secondary-custom"
                  >
                    Close
                  </Button>
                ) : (
                  ""
                )}
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <>
            <div className="col-7 card ml-16-percent">
              <div className="d-flex gap-2 ms-5 mt-3">
                <Button
                  className="btn btn-primary btn-sm"
                  onClick={handleFlushDB}
                >
                  Flush DB
                </Button>
                <Button
                  className="btn btn-primary btn-sm"
                  onClick={handleContainerRestart}
                >
                  Restart Container
                </Button>
                <Button
                  className="btn btn-primary btn-sm"
                  onClick={handleReload}
                >
                  Reload Data
                </Button>
              </div>
              <Row className="flex-column m-3 h-100">
                <Col className="d-flex flex-column align-items-center p-4 border rounded mb-3">
                  <h5>NeoAI LLM Config</h5>
                  <div className="d-flex align-items-start mt-4 w-100">
                    <FormControl fullWidth className="p-2">
                      <InputLabel>Select Option</InputLabel>
                      <Select
                        value={selectedLLM}
                        onChange={(e) => handleSelect(e.target.value)}
                        className="custom-select-height"
                      >
                        {llmConfig.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      className="btn btn-primary btn-sm mt-2"
                      onClick={handleLLMSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>

                <Col className="d-flex flex-column align-items-center p-4 border rounded">
                  <h5>Neo4j Status</h5>
                  <div className="d-flex align-items-start mt-4 w-100">
                    <FormControl fullWidth className="p-2">
                      <InputLabel>Select Option</InputLabel>
                      <Select
                        value={selectedNeo4jOption}
                        onChange={(e) => setSelectedNeo4jOption(e.target.value)}
                        className="custom-select-height"
                      >
                        {neo4jStatusOptions.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Switch
                      checked={isActive}
                      size="large"
                      className=""
                      onChange={handleToggle}
                    />
                  </div>
                </Col>
                <Col className="d-flex flex-column align-items-center p-4 border rounded mt-3">
                  <h5>Storage Location</h5>
                  <div className="d-flex align-items-start mt-3 w-100 h-10">
                    <FormControl fullWidth className="p-2">
                      <InputLabel>Select Storage</InputLabel>
                      <Select
                        value={storageOption}
                        onChange={handleStorageChange}
                        className="custom-select-height"
                      >
                        {storageStatusOptions.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      className="btn btn-primary btn-sm mt-2"
                      onClick={handleStorageClick}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
