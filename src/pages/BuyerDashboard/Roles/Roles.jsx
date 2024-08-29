import React, { Fragment } from 'react'
import True from '../../../assets/true.png'
import Wrong from '../../../assets/wrong.png'
import './Roles.css';
import { Helmet } from 'react-helmet-async';

const Roles = () => {
    return (
        <Fragment>
              <Helmet>
            <title>Rules and Permissions | Ulinkit - Manage Your Access and Permissions</title>
            <meta name="description" content="View and manage your rules and permissions on Ulinkit. Understand your access levels, roles, and what actions you can perform within the system." />
            <link rel="canonical" href="https://www.ulinkit.com/roles" />
        </Helmet>
            <div className='responsive'>
                <div className='userDashboard'>
                    <h1 className='user-titles pay-title rules-left'>Rules and Permissions</h1>
                    <p className='paragraph-5'>Use roles to set custom permissions for each person that has access to your business account. You decide who is permitted to do what. Roles are not permanent and can be changed by any Admin account.</p>
                </div>
                <div className='another-border'>
                    <h1 className="user-title management">Management</h1>
                    <div className='border-1  bor-1 box-container-border management-border'>
                        <div className='card-table'>
                            <div className='table-1'>Permission</div>
                            <div className='table-1'>Admin</div>
                            <div className='table-1'>Superviser</div>
                            <div className='table-1'>User</div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border' >
                        <div className='card-details-table'>
                            <div className='table-1'>Invite and deactivate accounts</div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'><img className='wrong' src={Wrong } alt='wrong'></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='wrong'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Assign roles</div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'><img className='wrong' src={Wrong} alt='wrong'></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='wrong'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Edit business documents</div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'><img className='wrong' src={Wrong} alt='wrong'></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='wrong'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Edit company details</div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'><img className='wrong' src={Wrong} alt='worng'></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='wrong'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Update financial details</div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'><img className='wrong' src={Wrong} alt='wrong'></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='wrong'/>
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="user-title management">Payment</h1>
                    <div className='border-1  bor-1 box-container-border management-border'>
                        <div className='card-table'>
                            <div className='table-1'>Permission</div>
                            <div className='table-1'>Admin</div>
                            <div className='table-1'>Superviser</div>
                            <div className='table-1'>User</div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Request full order cancellation</div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='wrong'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Request partial order cancellation</div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='wrong'/>
                            </div>
                        </div>
                    </div>
                    <h1 className="user-title management">Messages & Enquiries</h1>
                    <div className='border-1  bor-1 box-container-border management-border'>
                        <div className='card-table'>
                            <div className='table-1'>Permission</div>
                            <div className='table-1'>Admin</div>
                            <div className='table-1'>Superviser</div>
                            <div className='table-1'>User</div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>View all messages and enquiries</div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'>
                            <img className='true' src={True} alt='true'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Respond to all messages and enquiries</div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'>
                            <img className='true' src={True} alt='true'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Archive enquiries</div>
                            <div className='table-1'><img className='true' src={True} alt='true'></img></div>
                            <div className='table-1'><img className='true' src={True}  alt='true'></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='true'/>
                            </div>
                        </div>
                    </div>
                    <h1 className="user-title management">Orders</h1>
                    <div className='border-1  bor-1 box-container-border management-border'>
                        <div className='card-table'>
                            <div className='table-1'>Permission</div>
                            <div className='table-1'>Admin</div>
                            <div className='table-1'>Superviser</div>
                            <div className='table-1'>User</div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Place orders</div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'>
                            <img className='true' src={True} alt='true'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>View orders</div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'>
                            <img className='true' src={True} alt='true'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Submit request for quotation</div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='true'/>
                            </div>
                        </div>
                    </div>
                    <div className='border-1 bor-1 management-border'>
                        <div className='card-details-table'>
                            <div className='table-1'>Manage order requests (above & decline)</div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'><img className='true' src={True}></img></div>
                            <div className='table-1'>
                            <img className='wrong' src={Wrong} alt='true'/>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
        </Fragment>
    )
}

export default Roles