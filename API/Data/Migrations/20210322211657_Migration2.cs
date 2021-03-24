using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Migration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Pacients");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Pacients",
                type: "BLOB",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Pacients",
                type: "BLOB",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Pacients");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Pacients");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Pacients",
                type: "TEXT",
                nullable: true);
        }
    }
}
