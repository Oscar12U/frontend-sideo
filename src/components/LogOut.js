import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { auth } from '../firebase';

const logOut = () => {
    sessionStorage.clear();
    return auth.signOut();
}

export default logOut;

