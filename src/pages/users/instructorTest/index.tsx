import { Button } from "@/components/ui/button";
import { checkAuth } from "@/store/reducers/reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InstructorTest = (data) => {
  // const role = useSelector(state=>state?.auth?.user?.role)
  const isAuth = useSelector(state=>state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(checkAuth())
  },[])
  const handleBuy = (d)=>{
    if(!isAuth){
      navigate("/user/login")
      return;
    }else{

      navigate(`/instructor-test-details/${d}`)
    }
    console.log(d)
  }

  return (
    <div className="flex sm:flex-row flex-col mx-4 sm:mx-24 border rounded-xl mb-8 bg-secondary">
      <div className="flex flex-col justify-between py-4 px-2 sm:w-[40%]">
        <div className=" w-full border-r p-5">
          <div className="flex items-center gap-8">
            <img
              src="/images/usersIcons/instructor.png"
              alt="Avatar"
              className="avatar"
              width={50}
              height={50}
            />
            <div>
              <p className="text-highlight">{data?.data?.instructorName}</p>
              <span className="text-xs font-medium text-gray-400">
                {data?.data?.instructorBio}
              </span>
            </div>
          </div>
          {data?.data?.quizShortDesc.map((d) => 
            <div className="mt-4">
              <h1 className=" font-semibold text-btn">{d.title}</h1>
              <span>{d.content}</span>
            </div>
          )}
        </div>
        <div className="mt-8 border bottom-0 flex flex-col justify-end">
          <Button onClick={()=>handleBuy(data?.data?._id)} className="px-4 py-2 bg-btn rounded text-white text-sm font-medium w-full">
            Buy it
          </Button>
        </div>
      </div>
     
      <div className="p-5 sm:w-[60%]">
        <h3 className=" font-semibold text-highlight mb-4">
          Tests Description
        </h3>
        {data?.data?.quizFullDesc?.map((d) => 
        <ul>
          <li className="mb-2">
            <strong>{d.title}:</strong> {d.content}
          </li>
          
        </ul>)}
      </div>
    </div>
  );
};

export default InstructorTest;
