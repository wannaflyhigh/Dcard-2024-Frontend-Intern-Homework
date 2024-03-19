import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function useGithubAuth() {
	return useContext(AuthContext)
}

function removeParamFromUrl() {
	const urlWithoutParams = window.location.origin + window.location.pathname
	window.history.replaceState({}, document.title, urlWithoutParams)
}

export function GithubAuthProvider(props) {
	const { VITE_CLIENT_ID, VITE_BACKEND_URL } = import.meta.env

	const code = new URL(location.href).searchParams.get("code")

	const [accessToken, setAccessToken] = useState(
		localStorage.getItem("access_token")
	)
	const errorAccessToken = accessToken === null || accessToken === ""

	const [isLoading, setIsLoading] = useState(code != null)
	const [isLogin, setIsLogin] = useState(!errorAccessToken)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		if (code) {
			setIsLoading(true)
			fetch(VITE_BACKEND_URL + `/codeExchageAuthToken?code=${code}`)
				.then((res) => res.json())
				.then((data) => {
					console.log("Got Access Token!")
					localStorage.setItem("access_token", data.access_token)
					removeParamFromUrl()
					setIsLogin(true)
					setAccessToken(data.access_token)
					setIsLoading(false)
				})
				.catch((err) => {
					setIsError(true)
					console.error(err)
				})
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				isLogin,
				accessToken,
				isError,
				isLoading,
				setIsLogin,
				setAccessToken,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}
