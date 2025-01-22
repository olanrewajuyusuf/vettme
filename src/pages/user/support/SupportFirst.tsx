import axios from "axios"
import { useEffect, useState } from "react"
import Support from "./Support"


function SupportFirst() {
	const[conversationId, setConversationId] = useState({})
	const companyId = localStorage.getItem("companyId")
	const adminId = "718be1e1-bf81-487c-a236-fda9ad206e6b"

	useEffect(() => {
		const getConversation = async() => {
			try{
				const res = await axios.get(`https://vettme-pro.onrender.com/api/pro/conversation/find/${companyId}/${adminId}`)
				setConversationId(res.data.data.id)
			} catch(err) {
				console.error(err)
			}
		}
		getConversation()
	}, [companyId, adminId])
  return (
	<div>{conversationId && <Support conversationId={{ id: `${conversationId}` }} />}</div>
  )
}

export default SupportFirst