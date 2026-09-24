import discord, os, datetime
from discord import app_commands
from discord.ext import commands

bot = commands.Bot(command_prefix="!", intents=discord.Intents.all())

@bot.event
async def on_ready():
    await bot.tree.sync()
    print("البوت اشتغل")

@bot.tree.command(name="say", description="خلي البوت يقول رسالة في اي روم")
async def say(interaction: discord.Interaction, رساله: str, روم: discord.TextChannel = None):
    target = روم or interaction.channel
    await target.send(رساله)
    await interaction.response.send_message("✅ اتبعتت", ephemeral=True)

@bot.tree.command(name="ban", description="باند لعضو")
@app_commands.checks.has_permissions(ban_members=True)
async def ban(interaction: discord.Interaction, عضو: discord.Member):
    await interaction.guild.ban(عضو)
    await interaction.response.send_message(f"تم باند {عضو.mention}")

@bot.tree.command(name="mute", description="ميوت بالدقايق")
@app_commands.checks.has_permissions(moderate_members=True)
async def mute(interaction: discord.Interaction, عضو: discord.Member, دقايق: int):
    await عضو.timeout(datetime.timedelta(minutes=دقايق))
    await interaction.response.send_message(f"ميوت {دقايق}د لـ {عضو.mention}")

bot.run(os.environ["TOKEN"])
