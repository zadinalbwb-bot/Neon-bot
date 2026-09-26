const http = require('http');
http.createServer((req,res)=>res.end('Bot online')).listen(process.env.PORT||3000);
const {Client,GatewayIntentBits,EmbedBuilder,PermissionFlagsBits,ChannelType,ButtonBuilder,ButtonStyle,ActionRowBuilder}=require('discord.js');
const fs=require('fs');
const client=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers,GatewayIntentBits.MessageContent]});
const replies={"السلام عليكم":"وعليكم السلام ❤️","برب":"تيت 👋","باك":"ولكم 🔥","هلا":"هلا والله 😍"};
client.on('ready',async()=>{console.log('Online '+client.user.tag);
await client.application.commands.set([
{name:'kick',description:'طرد عضو',options:[{name:'member',description:'العضو',type:6,required:true},{name:'reason',description:'السبب',type:3}],default_member_permissions:PermissionFlagsBits.KickMembers.toString()},
{name:'ban',description:'باند',options:[{name:'member',description:'العضو',type:6,required:true},{name:'reason',description:'السبب',type:3}],default_member_permissions:PermissionFlagsBits.BanMembers.toString()},
{name:'timeout',description:'تايم اوت',options:[{name:'member',description:'العضو',type:6,required:true},{name:'duration',description:'المدة بالدقايق',type:4,required:true},{name:'reason',description:'السبب',type:3}],default_member_permissions:PermissionFlagsBits.ModerateMembers.toString()},
{name:'rename',description:'تغيير اسم',options:[{name:'member',description:'العضو',type:6,required:true},{name:'name',description:'الاسم الجديد',type:3,required:true}],default_member_permissions:PermissionFlagsBits.ManageNicknames.toString()},
{name:'setup-ticket',description:'اعداد التكتات',options:[{name:'channel',description:'روم',type:7,required:true},{name:'description',description:'الوصف',type:3},{name:'support_role',description:'رتبة الدعم',type:8},{name:'category',description:'كاتيجوري',type:7,channel_types:[4]}],default_member_permissions:PermissionFlagsBits.Administrator.toString()},
{name:'ping',description:'البنج'}]);});
client.on('messageCreate',m=>{if(m.author.bot)return;const c=m.content.toLowerCase();for(let k in replies)if(c.includes(k)){m.reply(replies[k]);break;}});
client.on('interactionCreate',async i=>{
if(i.isChatInputCommand()){
if(i.commandName==='ping')await i.reply('🏓 '+client.ws.ping+'ms');
if(i.commandName==='kick'){const m=i.options.getMember('member');const r=i.options.getString('reason')||'بدون سبب';await m.kick(r);await i.reply({embeds:[new EmbedBuilder().setColor('Red').setDescription('✅ تم طرد '+m+' | '+r)]})}
if(i.commandName==='ban'){const m=i.options.getMember('member');const r=i.options.getString('reason')||'بدون سبب';await m.ban({reason:r});await i.reply({embeds:[new EmbedBuilder().setColor('DarkRed').setDescription('✅ تم تبنيد '+m+' | '+r)]})}
if(i.commandName==='timeout'){const m=i.options.getMember('member');const d=i.options.get
