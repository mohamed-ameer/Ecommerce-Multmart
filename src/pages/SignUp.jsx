import React, {useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, Navigate } from 'react-router-dom'
import '../styles/login.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { storage } from '../firebase.config'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import { upload } from '@testing-library/user-event/dist/upload'
import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'

const SignUp = ()=> {

  const [ username, setUsername] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signup = async(e) =>{
    e.preventDefault()
    setLoading(true)

    try{
      const userCredntial = await createUserWithEmailAndPassword(auth, email, password)
      const user= userCredntial.user
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask =  uploadBytesResumable(storageRef, file)

      uploadTask.on((error) =>{
        toast.error(error.message)
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downlaodURL) =>{
          await updateProfile(user,{
            displayName:username,
            photoURL: downlaodURL
          })
          await setDoc(doc(db, 'users', user.uid), {
            uid:user.uid,
            displayName:username,
            email,
            photoURL: downlaodURL,
          })
        })
      })
      setLoading(false)
      toast.success('Account created')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('something went wronge')
    }
  }

    return (

      <Helmet titl='SignUp'>
        <section>
          <Container>
            <Row>
              {
                loading? <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading.....</h5></Col> : <Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold mb-4'>Signup</h3>
                <Form className='auth__form' onSubmit={signup}>
                <FormGroup className='form__group'>
                    <input type="emai" placeholder='username' value={username} onChange={e=> setUsername(e.target.value)} />
                  </FormGroup>

                  <FormGroup className='form__group'>
                  <input type="emai" placeholder='Enter your email' value={email} onChange={e=> setEmail(e.target.value)} />
                </FormGroup>
  
                  <FormGroup className='form__group'>
                    <input type="password" placeholder='Enter your password' value={password} onChange={e=> setPassword(e.target.value)}/>
                  </FormGroup>
    
                  <FormGroup className='form__group fileee'>
                    <input type="file" onChange={e=> setFile(e.target.files[0])}/>
                  </FormGroup>
  
                  <button type='submit' className="buy__btn auth__btn">Create and Account</button>
                  <p>
                    Already have an account?{' '}
                    <Link to='/login'>Login</Link>
                  </p>
                </Form>
  
              </Col>
                
              }
            </Row>
          </Container>
        </section>
      </Helmet>
    )
}

export default SignUp
