import React from "react";
import Image from "next/image";
import binp from"../../assets/binimage.png"
import { useState,useEffect } from 'react';
import  Styles from "./Deletebutton.module.css";
const Deleteaccount=(props)=>{
    const [currentPassword, setCurrentPassword] = useState('');
    const [UserName, setUserName] = useState('');
    const [CheckBox,setCheckBox]=useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isUserNameValid, setIsUserNameValid] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
  
    const handleCurrentPasswordChange = (event) => {
      setCurrentPassword(event.target.value);
    };
  
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleChechboxChange = () => {
        setCheckBox(!CheckBox);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission
      if (currentPassword.trim().length < 8) {
        setIsPasswordValid(false);
        setPasswordErrorMessage('Password must be at least 8 characters long.');
      } else if(currentPassword!=props.password) {
        setIsPasswordValid(false);
        setPasswordErrorMessage('Incorrect password.');
      }else{
        setIsPasswordValid(true);
        setPasswordErrorMessage('');
      }

      // Validate email
      if (UserName!=props.username) {
        setIsUserNameValid(false);
      } else {
        setIsUserNameValid(true);
      }
      if(isUserNameValid&&isPasswordValid){
        setIsFormValid(true);
      }
    }
    useEffect(() => {
      // Submit form 
      if (isFormValid&&isUserNameValid&&isPasswordValid) {
        console.log("deleted");  
        closeModal();
      }
    }, [isFormValid, isPasswordValid, isUserNameValid]);
    // Disable the button if either input is empty
    const isButtonDisabled = currentPassword === '' || UserName === ''|| !CheckBox;
  
    const openModal = (event) => {
      setIsFormValid(false);
      handleCurrentPasswordChange(event);
      handleUserNameChange(event);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setCheckBox(false);
      setIsPasswordValid(true);
      setIsUserNameValid(true);
      setIsFormValid(false);
      setShowModal(false);
    };

    return(
        <div className={Styles.deletecontainer}>
            <div className={Styles.leftflex}>
                <Image className={Styles.bin} src= {binp} />
                <button className={Styles.delete} onClick={openModal}>DELETE ACCOUNT</button>
            </div>
            {showModal && (
                <div className={Styles.modaloverlay}>
                    <div className={Styles.modal}>
                        <button className={Styles.Xbutton} onClick={closeModal}>X</button>
                        <h2 className={Styles.deleteformlabel}>Delete account</h2>
                        <hr className={Styles.line}></hr>
                        <p>We're sorry to see you go</p>
                        <p>Once you delete your account, your profile and username are permanently removed from Reddit and your posts, comments, and messages are disassociated (not deleted) from your account unless you delete them beforehand.</p>
                        <a className={Styles.learnmore} href="https://support.reddithelp.com/hc/en-us/articles/360043047932-If-I-delete-my-account-what-happens-to-my-username-posts-and-comments">Learn more</a>
                        <label className={Styles.dlabel} for="whyleaving">HELP IMPROVE REDDIT(OPTIONAL)</label>
                        <textarea className={Styles.whyleaving} cols="50" rows="5" placeholder="Let us know why you're leaving"></textarea>
                        <form>
                            <div className={Styles.deleteform}>
                                <p className={Styles.verify}>VERIFY YOUR IDENTITY</p>
                                <input  className={isUserNameValid ? Styles.inputs : Styles.invalidInput} placeholder="USERNAME" onChange={handleUserNameChange}></input>
                                {!isUserNameValid && <p className={Styles.errorMessage}>Invalid Username</p>}
                                <input className={isPasswordValid ? Styles.inputs : Styles.invalidInput} type="password" placeholder="PASSWORD" onChange={handleCurrentPasswordChange}></input>
                                {!isPasswordValid && <p className={Styles.errorMessage}>{passwordErrorMessage}</p>}
                                <div className={Styles.inlineflex}>
                                    <input type="checkbox" className={Styles.checkfordelete} checked={CheckBox} onClick={handleChechboxChange}></input>
                                    <label className={Styles.dlabel} for="checkfordelete">I understand that deleted accounts aren't recoverable</label>
                                </div>
                                <div className={Styles.leftflex}>
                                    <button className={Styles.brightbutton} onClick={closeModal}>CANCEL</button>
                                    <button className={Styles.smalldarkbutton} disabled={isButtonDisabled} onClick={handleSubmit}>DELETE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
  }
  export default Deleteaccount;