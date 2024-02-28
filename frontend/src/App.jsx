import { useState } from "react"
import Login from "./components/Login"
import { AppBar, Box, Toolbar, Typography } from "@mui/material"

function App() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar>
				<Toolbar>
					<Typography sx={{ flexGrow: 1 }}>Dcard 實習作業</Typography>
					<Login />
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default App
