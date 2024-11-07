import React from 'react';
import '../../css/Logs.css'

const AuditLogs = ({ logs }) => {
	return (
		<div className="audit-logs-container">
			<h2 className="table-title">Audit Logs</h2>
			<table className="audit-logs-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>User ID</th>
						<th>Product ID</th>
						<th>Action</th>
						<th>Before Change</th>
						<th>After Change</th>
						<th>Created At</th>
						<th>Updated At</th>
					</tr>
				</thead>
				<tbody>
					{logs && logs.length > 0 ? (
						logs.map((log) => (
							<tr key={log.id}>
								<td>{log.id}</td>
								<td>{log.user_id}</td>
								<td>{log.product_id}</td>
								<td>{log.action}</td>
								<td className={log.before ? '' : 'no-data'}>
									{log.before ? (
										log.action === 'delete' ? (
											<span>Product Deleted</span>
										) : (
											JSON.stringify(log.before)
										)
									) : (
										'No Data'
									)}
								</td>
								<td className={log.after ? '' : 'no-data'}>
									{log.after ? (
										log.action === 'delete' ? (
											<span>Product Deleted</span>
										) : (
											JSON.stringify(log.after)
										)
									) : (
										'No Data'
									)}
								</td>
								<td>{new Date(log.created_at).toLocaleString()}</td>
								<td>{new Date(log.updated_at).toLocaleString()}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="8">No audit logs available</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AuditLogs;
