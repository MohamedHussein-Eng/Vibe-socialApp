import DescriptionLogin from '../../comps/Login-SignupComp/DescriptionLogin'
import LoginForm from '../../comps/Login-SignupComp/LoginForm'
export function Login() {
    return (
        <main className='min-h-screen w-full   bg-[#101622] ' style={{ fontFamily: 'Cairo, sans-serif' }}>
            <div className=' w-full flex flex-col  lg:flex-row   justify-between'>
                    <DescriptionLogin></DescriptionLogin>
                    <LoginForm />
            </div>
        </main>
    )
}