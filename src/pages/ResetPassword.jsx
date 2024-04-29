import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';

const ResetPassword = () => {

    const navigate = useNavigate();
    const login = () => {
        alert('Congrats! Your password has been reset successfully. Please login again.')
        navigate('/login');
    }
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    return (
        <Fragment>
            <div className="flex login-cont wh">
                <div className="flex wh">
                    <img src={bg} className='bgdiv' alt="" />
                </div>

                <div className="signupcont">
                    <div className='flexcol cover'>
                        <div className="heading">Reset your password</div>
                        <div className="flexcol gap">
                            <input type='password' className="box flex" placeholder='Enter new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <input type='password' className="box flex" placeholder='Confirm new password' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            <button className='btn box flex' onClick={login} type='submit'><div className="heading2">Continue</div></button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default ResetPassword