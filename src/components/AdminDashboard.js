import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flushDB, containerRestart, neo4jStatus, reloadData, changeStorage } from "../actions/adminActions";
import { toast } from 'react-toastify';
import Switch from '@mui/material/Switch';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import edit from '../Assets/edit.svg'
import deleteicon from '../Assets/delete.svg'
import userApproveIcon from '../Assets/userApprove.svg'
import rejectIcon from '../Assets/rejectUser.svg'
import resetPass from '../Assets/resetPass.svg'
import { userList, pendingUserList, userApprove, userDelete, userReject, userRoleEdit, userResetPassword } from "../actions/userActions";
import Swal from "sweetalert2";
import { showConfirmAlert, showSuccessAlert, showErrorAlert } from "../utils/config";
export function AdminDashboard() {
    const [activeadminTab, setadminActiveTab] = useState("adminUsers");
    const [userData, setUserData] = useState()
    const [modelFrom, setModelFrom] = useState("")
    const [modelHead, setModelHead] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState("users");
    let roles = [{ id: '1', rolename: "super_user" }, { id: '2', rolename: "admin" }, { id: '3', rolename: "user" }]
    const dispatch = useDispatch();
    let users = useSelector((state) => state.usersList?.userListData?.payload?.data?.users);
    const pendingUsers = useSelector((state) => state.usersList?.pendingUsers?.payload?.data?.pending_users);
    useEffect(() => {
        dispatch(userList())
        dispatch(pendingUserList())
    }, []);
    const neo4jStatusOptions = [{ label: "Include All", value: 'False' }, { label: "Include Texts", value: 'True' }];
    const storageStatusOptions = [{ label: "Local", value: 'local' }, { label: "S3", value: 's3' },
    { label: "Blob", value: 'blob' }, { label: "Google Storage Bucket", value: 'google storage bucket' }];
    const [selectedNeo4jOption, setSelectedNeo4jOption] = useState('True');
    const [storageOption, setStorageOption] = useState('local');
    const [isActive, setIsActive] = useState(false);
    const [formValues, setFormValues] = useState({email: "", role: "", company_name: "" });
    const onRoleChange = (e, user) => {
        let selectedProject = roles.find(
            (role) => role.id === e.target.value
        );
        setFormValues({ role: selectedProject.rolename })
        setUserData({
            role: selectedProject.rolename,
            roleId: e.target.value,
            userid: user.id
        })
    }
    const onEditRole = (e, user) => {
        setModelFrom("User")
        setModelHead("Edit Role")
        setSelectedUser(user);
        setShowModal(true);
    };
    const approveUser = (e, user) => {
        dispatch(userApprove(user.id))
            .then((response) => {
                if (response?.status === 200) {
                    showSuccessAlert('Success', 'User approved successfully!');
                    dispatch(userList());
                    dispatch(pendingUserList());
                } else {
                    showErrorAlert('Error', 'Failed to approve user.');
                }
            })
            .catch(() => {
                showErrorAlert('Error', 'Something went wrong.');
            });
    };
    const submitEditedRole = (user) => {
        showConfirmAlert("Edit", "Do you want to edit this user's role?", "Yes, Edit it!")
            .then((result) => {
                if (result.isConfirmed) {
                    setShowModal(false);
                    dispatch(userRoleEdit(user))
                        .then((response) => {
                            if (response?.status === 200) {
                                showSuccessAlert('Success', 'User role has been edited successfully!');
                                dispatch(userList());
                            } else {
                                showErrorAlert('Error', 'Failed to edit user role.');
                            }
                        })
                        .catch(() => {
                            showErrorAlert('Error', 'Something went wrong while editing the user role.');
                        });
                } else {
                    Swal.close();
                }
            });
    };
    const deleteUser = (user) => {
        showConfirmAlert('Delete', 'Do you want to delete this user?', 'Yes, delete it!')
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(userDelete(user.id))
                        .then((response) => {
                            if (response?.status === 200) {
                                showSuccessAlert('Deleted!', 'User has been deleted.');
                                dispatch(userList());
                            } else {
                                showErrorAlert('Error', 'Failed to delete user.');
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
        showConfirmAlert('Reject', 'Do you want to reject this user?', 'Yes!')
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(userReject(user.id))
                        .then((response) => {
                            if (response?.status === 200) {
                                showSuccessAlert('Rejected!', 'User has been rejected successfully.');
                                dispatch(userList());
                                dispatch(pendingUserList());
                            } else {
                                showErrorAlert('Error', 'Failed to reject user.');
                            }
                        })
                        .catch(() => {
                            showErrorAlert('Error', 'Something went wrong while rejecting the user.');
                        });
                } else {
                    Swal.close();
                }
            });
    };
    const onResetPass = (user) => {
        setSelectedUser(user);
        setModelFrom("Reset")
        setModelHead("Reset Password")
        setShowModal(true);
    }
    const onPasswordChange = (e) => {
        setNewPassword({ new_password: e.target.value })
    }
    const resetPassWord = (user) => {
        dispatch(userResetPassword(newPassword, selectedUser))
            .then((response) => {
                setShowModal(false);
                if (response?.status === 200) {
                    showSuccessAlert('Reset Password', 'Password has been reset successfully!');
                } else {
                    showErrorAlert('Error', 'Failed to reset password.');
                }
            })
            .catch(() => {
                setShowModal(false);
                showErrorAlert();
            });
    };
    const onFilter = (e) => {
        setShowModal(true);
        setModelFrom("Filter")
        setModelHead("Filter")
    }
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userList(formValues))
        setFormValues({ email: "", role: "", company_name: "" })
        setShowModal(false);
    };
    const handleFlushDB = () => {
        dispatch(flushDB())
            .then(response => response && toast.success(response.data))
            .catch(() => toast.error("Failed to flush database"));
    };
    const handleContainerRestart = () => {
        dispatch(containerRestart())
            .then(response => response && toast.success("Application restarted successfully"))
            .catch(() => toast.error("Failed to restart application"));
    };
    const handleReload = () => {
        dispatch(reloadData())
            .then(response => response && toast.success(response.data.message))
            .catch(() => toast.error("Failed to reload data"));
    };
    const handleToggle = (event) => {
        const newValue = event.target.checked;
        setIsActive(newValue);
        const formData = new FormData();
        formData.append('status', newValue ? 'True' : 'False');
        formData.append('texts', selectedNeo4jOption);
        dispatch(neo4jStatus(formData))
            .then(response => response && toast.success(response.message))
            .catch(() => toast.error("Failed to update status"));
    };
    const handleStorageChange = (event) => {
        setStorageOption(event.target.value);
    };
    const handleReset = (e) => {
        setFormValues({ email: "", role: "", company_name: "" })
        dispatch(userList())
        setShowModal(false);

    }
    const handleStorageClick = () => {
        const formData = new FormData();
        formData.append('storage', storageOption);
        dispatch(changeStorage(formData))
            .then(response => response && toast.success("Storage updated successfully"))
            .catch(() => toast.error("Failed to update storage"));
    };
    return (
        <Container fluid className="w-90">
            <Row style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <HeaderComponent />
            </Row>
            <div
                className="flex-grow-1"
                style={{ marginTop: "20px" }}
            >
                <BootstrapSidebar /></div>
            <div className="row">
                <ul className="nav">
                    <li className="nav-item" style={{ marginLeft: '10%' }}>
                        <button
                            className={`nav-link ${activeadminTab === "adminUsers" ? "active-tab" : ""}`}
                            onClick={() => setadminActiveTab("adminUsers")}>
                            Users
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeadminTab === "actions" ? "active-tab" : ""}`}
                            onClick={() => setadminActiveTab("actions")}
                        >
                            Actions
                        </button>
                    </li>
                </ul>
                <hr className="navBarAdmin"></hr>
                {activeadminTab === "adminUsers" ?
                    (<>
                        <ul className="nav gap-5 d-flex align-items-center w-100 position-relative">
                            <li className="nav-item" style={{ marginLeft: '10%' }}>
                                <button
                                    className={`nav-link ${activeTab === "users" ? "active-tab" : ""}`}
                                    onClick={() => setActiveTab("users")}>
                                    Active Users
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === "pendingUsers" ? "active-tab" : ""}`}
                                    onClick={() => setActiveTab("pendingUsers")}
                                >
                                    Pending Users
                                </button>
                            </li>
                            {activeTab === "users" && (
                                <button
                                    className="btn btn-outline-dark btn-sm position-absolute"
                                    style={{ right: "3%" }} // Move it slightly to the left
                                    title="Edit Role"
                                    onClick={(e) => onFilter(e)}
                                >
                                    Filter
                                </button>
                            )}
                        </ul>
                        <hr className="navBarAdmin"></hr>
                        <div className="content">
                            {activeTab === "users" && (
                                <div className="w-70" style={{ maxHeight: '400px', overflowY: "auto", overflowX: 'hidden' }}>
                                    {users &&
                                        <table className="table table-bordered table-hover" style={{ fontSize: 10, marginLeft: '7%', width: '90%' }}>
                                            <thead className="table-active" style={{ position: "sticky", top: 0, zIndex: 0 }}>
                                                <tr>
                                                    <th style={{ width: "3%" }}>Sl.N</th>
                                                    <th style={{ width: "15%" }}>Name</th>
                                                    <th style={{ width: "10%" }}>Role</th>
                                                    <th>Email</th>
                                                    <th style={{ width: "18%" }}>Company Name</th>
                                                    <th>Registerd Date</th>
                                                    <th>Last Update Date</th>
                                                    <th style={{ width: "10%" }}>Actions</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {users?.length > 0 ? (

                                                    users?.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{user.full_name}</td>
                                                            <td >{user.role}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.company_name}</td>
                                                            <td>{user.created_at}</td>
                                                            <td>{user.updated_at}</td>
                                                            <td>
                                                                <button className="btn " title="Edit Role" onClick={(e) => onEditRole(e, user)} style={{ border: 0 }}>
                                                                    <img src={edit} alt="edit" className="" />
                                                                </button>
                                                                <button className="btn" title="Delete User" onClick={(e) => deleteUser(user)} style={{ border: 0 }}>
                                                                    <img src={deleteicon} alt="edit" className="" />
                                                                </button>
                                                                <button className="btn resetButton" title="Reset Password" onClick={(e) => onResetPass(user)} style={{ border: 0 }}>
                                                                    <img src={resetPass} alt="edit" className="" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : <tr>
                                                    <td colSpan="12" style={{ textAlign: "center", fontWeight: "bold" }}>No Data Found</td>
                                                </tr>}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            )}
                            {activeTab === "pendingUsers" &&
                                (<div className="" style={{ maxHeight: '400px', overflowY: "auto" }}>
                                    <table className="table table-bordered table-hover" style={{ fontSize: 10, marginLeft: '7%', width: '90%' }}>
                                        <thead className="table-active" style={{ position: "sticky", top: 0, zIndex: 0 }}>
                                            <tr>
                                                <th style={{ width: "5%" }}>Sl.N</th>
                                                <th style={{ width: "20%" }}>Name</th>
                                                <th style={{ width: "30%" }}>Email</th>
                                                <th style={{ width: "20%" }}>Company Name</th>
                                                <th>Registerd Date</th>
                                                <th style={{ width: "10%" }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingUsers?.length > 0 ? (
                                                pendingUsers.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.full_name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.company_name}</td>
                                                        <td>{user.created_at}</td>
                                                        <td>
                                                            <button className="btn" title="Approve User" onClick={(e) => approveUser(e, user)}>
                                                                <img src={userApproveIcon} alt="approve" />
                                                            </button>
                                                            <button className="btn" title="Reject User" onClick={() => rejectUser(user)}>
                                                                <img src={rejectIcon} alt="reject" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>No Data Found</td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>)}
                        </div>
                        <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            dialogClassName="custom-modal"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
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
                                        <input type="password" style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            fontSize: '14px',
                                        }}
                                            onChange={(e) => onPasswordChange(e, selectedUser)}></input>
                                    </>
                                ) : modelFrom === "User" ? (
                                    <>
                                        <p>User name : {selectedUser?.full_name}</p>
                                        <select
                                            id="roleSelect"
                                            name="role"
                                            onChange={(e) => onRoleChange(e, selectedUser)}
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                fontSize: '14px',
                                            }}
                                        >
                                            <option value="" hidden>Select a role</option>
                                            {roles?.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.rolename}
                                                </option>
                                            ))}
                                        </select>
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
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="rolefilter">Role:</label>
                                        <input
                                            type="text"
                                            id="rolefilter"
                                            name="role"
                                            placeholder="Enter role"
                                            value={formValues.role}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="companyFilter">Company Name:</label>
                                        <input
                                            type="text"
                                            id="companyFilter"
                                            name="company_name"
                                            placeholder="Enter company name"
                                            value={formValues.company_name}
                                            onChange={handleChange}
                                        />
                                        <div className="d-flex gap-3 align-items-end">
                                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#135ae8", color: "#fff", width: '30%' }}>
                                                Submit
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ color: "#fff", width: '30%' }}>
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={handleReset}>
                                                Reset
                                            </button>

                                        </div>
                                    </form>
                                ) : ''}
                            </Modal.Body>
                            <Modal.Footer>
                                {modelFrom === "Reset" ? (<Button
                                    variant="secondary"
                                    onClick={(e) => resetPassWord(e)}
                                    style={{
                                        backgroundColor: '#135ae8',
                                        borderColor: '#6c757d',
                                        color: '#fff',
                                    }}>
                                    Reset
                                </Button>) :
                                    modelFrom === "User" ? (
                                        <Button
                                            variant="secondary"
                                            onClick={(e) => submitEditedRole(userData)}
                                            style={{
                                                backgroundColor: '#135ae8',
                                                borderColor: '#6c757d',
                                                color: '#fff',
                                            }}>
                                            Submit
                                        </Button>
                                    ) : ''}
                                {modelFrom !== "Filter" ? (
                                    <Button
                                        variant="secondary"
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            backgroundColor: '#6c757d',
                                            borderColor: '#6c757d',
                                            color: '#fff',
                                        }}>
                                        Close
                                    </Button>) : ''}
                            </Modal.Footer>
                        </Modal>
                    </>)
                    : (<><div className='col-7 card' style={{ marginLeft: '16%' }}>
                        <div className='d-flex gap-2 ms-5 mt-3'>
                            <Button className="btn btn-primary btn-sm" onClick={handleFlushDB}>Flush DB</Button>
                            <Button className="btn btn-primary btn-sm" onClick={handleContainerRestart}>Restart Container</Button>
                            <Button className="btn btn-primary btn-sm" onClick={handleReload}>Reload Data</Button>
                        </div>
                        <Row className="flex-column m-3 h-100">
                            <Col className="d-flex flex-column align-items-center p-4 border rounded">
                                <h5>Neo4j Status</h5>
                                <div className="d-flex align-items-start mt-4 w-100">
                                    <FormControl fullWidth className="p-2">
                                        <InputLabel>Select Option</InputLabel>
                                        <Select value={selectedNeo4jOption} onChange={e => setSelectedNeo4jOption(e.target.value)} style={{ height: '35px' }}>
                                            {neo4jStatusOptions.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Switch checked={isActive} size="large" className="" onChange={handleToggle} />
                                </div>
                            </Col>
                            <Col className="d-flex flex-column align-items-center p-4 border rounded mt-3">
                                <h5>Storage Location</h5>
                                <div className="d-flex align-items-start mt-3 w-100 h-10">
                                    <FormControl fullWidth className="p-2">
                                        <InputLabel>Select Storage</InputLabel>
                                        <Select value={storageOption} onChange={handleStorageChange} style={{ height: '35px' }}>
                                            {storageStatusOptions.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button className="btn btn-primary btn-sm mt-2" onClick={handleStorageClick}>Submit</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    </>)}
            </div></Container>
    )
}