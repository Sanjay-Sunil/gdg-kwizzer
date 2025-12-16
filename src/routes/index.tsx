import { Routes, Route, Navigate } from 'react-router'
import Dashboard from '../pages/admin/dashboard'
import App from '../App'
import CreateQuiz from '../pages/admin/quiz/CreateQuiz'
import Join from '../pages/admin/participant/join'
import Quiz from '../pages/admin/participant/Quiz'
import Result from '../pages/admin/participant/Result'

export default function AppRoutes() {
	return (
		<Routes>
			<Route index element={<App />} />
			
			<Route path="admin">
				<Route index element={<Navigate to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path='quiz'>
					<Route index element={<CreateQuiz/>} />
				</Route>
			</Route>
			
			<Route path="participant">
				<Route index element={<Navigate to="join" />} />
				<Route path="join" element={<Join />} />
				<Route path="quiz" element={<Quiz />} />
				<Route path="result" element={<Result />} />
			</Route>

			<Route path="quiz">
				<Route index element={<Navigate to="list" />} />
			</Route>
		</Routes>
	)
}