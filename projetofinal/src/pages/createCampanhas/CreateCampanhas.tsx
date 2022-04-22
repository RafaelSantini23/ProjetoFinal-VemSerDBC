import { useEffect, useState } from "react"
import { connect, DispatchProp } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { AuthDTO } from "../../models/AuthDTO";
import { RootState } from "../../store";
import { isLoggedin } from "../../utils/Utils";



function CreateCampanhas({ auth, dispatch }: AuthDTO & DispatchProp) {
   const navigate = useNavigate()
   const [isVisibel, setIsVisibel] = useState(false);

    useEffect(() => {
        isLoggedin(navigate)
    }, [])

    const colabsTrab = [
        {
            id: "1",
            name: "João",
            photo: "https://sm.ign.com/t/ign_br/screenshot/default/supernatural-season-15-cast-poster-1420x798_cnnm.h720.jpg"
        }
    ]

  return (
    <div>
       <button onClick={() => setIsVisibel(true)}>DADSADSA</button>

       {  isVisibel && (
        <div>
            <Modal colabs={colabsTrab} onClick={() => setIsVisibel(false)} />
        </div> )   }
        <button >sair</button>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.AuthReducer.auth
})


export default connect(mapStateToProps)(CreateCampanhas)