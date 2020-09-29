function save_server()
{
	fs.writeFileSync('./cell_war_log.js',cell_write_file());
	fs.writeFileSync('./sm_player_status.js',sm_player_status());
	return true;
}