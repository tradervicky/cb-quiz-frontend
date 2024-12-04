import { makeApiRequest } from '@/apis/functions'
import React from 'react'
import { getSessionId } from '../apiCall'
import {load} from '@cashfreepayments/cashfree-js';
const CoursePayment = () => {
    const getSessionIdApiCall= async()=>{
        try {
            const response = getSessionId()
            if(response.data && response.data.session_id){
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        payment
    </div>
  )
}

export default CoursePayment