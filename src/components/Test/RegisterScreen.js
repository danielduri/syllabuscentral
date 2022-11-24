// RegisterScreen.js
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../features/user/userActions'

const RegisterScreen = () => {
    const { loading, userInfo, error, success } = useSelector(
        (state) => state.user
    )
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/user-profile')
    }, [navigate, userInfo, success])

    const submitForm = (data) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            alert('Password mismatch')
            return
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase()
        dispatch(createUser(data))
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {/* render error message with Error component, if any */}
            <div className='form-group'>
                <label htmlFor='firstName'>First Name</label>
                <input
                    type='text'
                    className='form-input'
                    {...register('firstName')}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    className='form-input'
                    {...register('email')}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    className='form-input'
                    {...register('password')}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Confirm Password</label>
                <input
                    type='password'
                    className='form-input'
                    {...register('confirmPassword')}
                    required
                />
            </div>
            <button type='submit' className='button' disabled={loading}>
                Register
            </button>
        </form>
    )
}
export default RegisterScreen