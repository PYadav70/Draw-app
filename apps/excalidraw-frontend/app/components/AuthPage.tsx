"use client"
export function AuthPage({isSignin}:{
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 bg-white m-2 rounded">
            <div>
                <input type="text" placeholder="email" />
            </div>
          
          <div>
          <input placeholder="Password" type="password" />
          </div>
           

            <button className="bg-blue-700 rounded" onClick={()=>{

            }}>{isSignin ? "Sign in" : "Sign up"}</button>
        </div>
    </div>
}