using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAO.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDriverRaceId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Races_RaceId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_RaceId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "RaceId",
                table: "Drivers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RaceId",
                table: "Drivers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_RaceId",
                table: "Drivers",
                column: "RaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Races_RaceId",
                table: "Drivers",
                column: "RaceId",
                principalTable: "Races",
                principalColumn: "Id");
        }
    }
}
