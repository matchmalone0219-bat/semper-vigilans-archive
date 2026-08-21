insert into theories (user_id, author, body)
select 'seed-1', '档案员', '工作标题 Semper Vigilans——时刻警惕——与猫头鹰法庭的格言过于接近，不可能是巧合。里夫斯把剧本锁在袋子里，通常意味着反派身份本身就是谜面。'
where not exists (select 1 from theories where user_id = 'seed-1');

insert into theories (user_id, author, body)
select 'seed-2', '南区证人', '格拉斯哥的圣诞布置不是氛围点缀。第一集是万圣节洪水，第二集如果落在冬天，日历本身就是叙事工具。'
where not exists (select 1 from theories where user_id = 'seed-2');

insert into theories (user_id, author, body)
select 'seed-3', '守夜人', '帕丁森这回会更像布鲁斯而不是蝙蝠。里夫斯自己说过，这是一个关于身份分裂的谜题，不是再讲一遍起源。'
where not exists (select 1 from theories where user_id = 'seed-3');

insert into theories (user_id, author, body)
select 'seed-4', '冬夜读者', '丹特一家同时进组——吉尔达、哈维、查尔斯——说明双面人不会以突然毁容的方式出场，而是一场缓慢的家庭崩溃。'
where not exists (select 1 from theories where user_id = 'seed-4');
