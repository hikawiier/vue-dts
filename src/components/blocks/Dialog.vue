<script setup lang="ts">
import { computed, inject, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { command } from '../../utils/api'
import type { GameState } from '../../types/interface'
const gameState = inject<GameState>('state') as GameState
const showDialog = ref(false)
const dialogID = ref('')
const noSkip = ref(false)
const nowPage = ref(0)
onMounted(() => {
  if (gameState.playerState?.dialog) {
    showDialog.value = true
    dialogID.value = gameState.playerState.dialog
    nowPage.value = 0
  }
  if (gameState.playerState?.noSkipDialog) {
    showDialog.value = true
    noSkip.value = true
    dialogID.value = gameState.playerState.noSkipDialog
    nowPage.value = 0
  }
})
watch(() => {
  return {
    dialog: gameState.playerState?.dialog,
    noSkipDialog: gameState.playerState?.noSkipDialog
  }
}, ({ dialog, noSkipDialog }) => {
  if (dialog) {
    showDialog.value = true
    noSkip.value = false
    dialogID.value = dialog
    nowPage.value = 0
  } else if (noSkipDialog) {
    showDialog.value = true
    noSkip.value = true
    dialogID.value = noSkipDialog
    nowPage.value = 0
  }
}, { deep: true })
const story: { [key: string]: any } = {
  "thiphase": {
    content: [
      '在你唱出那单一的旋律的霎那，<br>整个虚拟世界起了翻天覆地的变化……',
      '世界响应着这旋律，产生了异变……<br>因为破灭之歌的作用，全部锁定被打破了！',
      '在下一个瞬间——像是受到电磁干扰般，<br>你的战术界面突然变得花白一片。',
      '<span class="grey">“……防火墙……已……<br>……请到……山丘上……来……”</span>',
      '什么？',
      '没等你反应过来，那位不速之客便已切断了通讯。<br>你呆望着恢复如常的界面，试图厘清这段语焉不详的讯息究竟有何含义……',
    ]
  }
}
const close = async () => {
  let waitTimer = setTimeout(() => {
    gameState.loading = true
  }, 200)
  await command({ mode: 'command', command: 'end_dialogue' }).then(res => {
    showDialog.value = false
    window.clearTimeout(waitTimer)
    gameState.loading = false
    const data = res as any
    gameState.playerState = data.playerState
    gameState.actionLog = data.actionLog
  })
}
</script>
<template>
  <Transition>
    <div
      v-if="showDialog"
      class="fixed w-screen h-screen top-0 bg-black/70 shadow flex z-1"
      @click="close()"
    >
      <div @click.stop="" class="m-auto min-w-120 text-zinc-300 bg-zinc-900/95 border-2 border-zinc-700 p-4 rounded flex flex-col justify-between relative">
        <!-- 普通剧情 -->
        <template v-if="Object.keys(story).includes(dialogID)">
          <div>
            <p v-html="story[dialogID].content[nowPage]"></p>
          </div>
          <div class="flex justify-end space-x-4 mt-4">
            <p v-if="nowPage" @click="nowPage--" class="ring-1.5 ring-zinc-300 text-zinc-300 p-0.5 cursor-pointer w-max">
              <p class="text-sm bg-zinc-300 pl-2.5 pr-2 py-1 text-zinc-800 font-bold tracking-widest transition-colors hover:bg-transparent hover:text-zinc-300">上一页</p>
            </p>
            <p v-if="nowPage != story[dialogID].content.length - 1" @click="nowPage++" class="ring-1.5 ring-zinc-300 text-zinc-300 p-0.5 cursor-pointer w-max">
              <p class="text-sm bg-zinc-300 pl-2.5 pr-2 py-1 text-zinc-800 font-bold tracking-widest transition-colors hover:bg-transparent hover:text-zinc-300">下一页</p>
            </p>
            <p v-if="nowPage == story[dialogID].content.length - 1" @click="close()" class="ring-1.5 ring-zinc-300 text-zinc-300 p-0.5 cursor-pointer w-max">
              <p class="text-sm bg-zinc-300 pl-2.5 pr-2 py-1 text-zinc-800 font-bold tracking-widest transition-colors hover:bg-transparent hover:text-zinc-300">结束</p>
            </p>
          </div>
        </template>
        <!-- 开场剧情 -->
        <template v-if="dialogID == 'opening'">
          <div class="">
            <p v-if="nowPage == 0">
              <span class="evergreen">“你愿意为执念赌上生命吗？”</span><br><br>
              什么？你朝声音的来源望去，却只看到人山人海的虚拟幻境会场。<br>
              放眼望去，会场里的人们大都兴奋地攀谈着。<br>
              毕竟，他们都是奔着同一个目标而来——即将开始的生存挑战——“大逃杀”。<br>
            </p>
            <p v-if="nowPage == 1">
              <img src="/old/img/story/story_n1.jpg" class="m-auto"><br>
              你悄无声息地穿行在人群中，等待着信号。<br>
              可以说，这里的体验犹如身临其境，甚至比现实更加引人入胜。<br>
              真是多亏了 “林氏软件集团”的黑科技啊。 <br>
              然而你知道，由林氏集团垄断的这个活动，其实不时有恐怖的流言传出。<br>
              传说，每次活动后，总有几名参与者留下永久的心灵创伤，甚至精神失常、失去意识。<br>
              然而就算如此，也挡不住蜂拥而来的人们。<br>
              <br>
              “听说林氏集团的董事长有事缺席了。”<br>
              “好像她已经消失好些天了，现在都是「金龙通讯社」在管事。”<br>
              “我无所谓，反正只要有‘那个’的机会就够了。”<br>
              “哈哈哈，都懂的。”<br>
              <br>
              你暗暗叹气。<br>
              恐怕，这些“挑战者”要追求的，已经不仅仅是娱乐了。<br>
              确实技高一筹啊，林无月。这大概也是她放心退居幕后的原因了吧。<br>
            </p>
            <p v-if="nowPage == 2">
              <img src="/old/img/story/story_n2.jpg" class="m-auto"><br>
              <span class="ltcrimson">“让各位挑战者久等了。”</span><br>
              一个沉稳而自信的女声直接传入了你的脑海。<br>
              声音的主人，一名全身红装的女性，此刻两手撑着“大舞台”上的讲台，表情十分轻松。<br>
              她的位置远在会场的另一端，然而她的服饰和表情依然一览无遗，就像近在咫尺。<br>
              这大概就是“虚拟幻境”搞的鬼吧。<br><br>
              <span class="ltcrimson">“我叫<span class="ltcrimson b" style="font-size:14pt"><ruby>红 暮<rt style="font-size:9px">Crimson</rt></ruby></span>，受林无月的委托，主持本次‘大逃杀’。<br>
              这个生存挑战唯二的要素，就是‘逃’与‘杀’。<br>
              你们的目标就是成为最后的幸存者，为此你们必须彼此厮杀，不惜使用各种手段。<br>
              胜利者，将得到我们提供的丰厚奖励。失败者，请下局再接再厉。<br>
              不过，根据协议，我们不保证参与者的精神体验安全……”</span><br><br>
              你身旁有人不耐烦地喊道：“早知道了，快开始吧！”<br>
              红暮有点不悦地咳嗽了两声。<span class="ltcrimson">“那么……”</span>
            </p>
            <p v-if="nowPage == 3">
              突然，随着一阵惊呼，原本光怪陆离的会场陷入一片黑暗，只剩“大舞台”还亮着。<br>
              <br>
              是信号吗？<br>
              <br>
              你略一迟疑，只见一个身影一跃而过，直扑讲台而去。<br>
              红暮一脸惊讶地后退了两步。<br>
              <span class="seagreen">“你们也该省省了！”</span>不速之客一声暴喝跃过讲台，刀光一闪，“红暮”的身影便被一刀两断。<br>
              但是，对方并没有血溅当场，而只是迅速淡化消失了。<br>
              <span class="seagreen">“哼，原来是个幻象，胆小鬼。”</span><br>
              不速之客将光刃收起，你这才发现他是个少年。<br>
              确切地说，你认识他。更确切地说，你要等的就是他。<br>
              <br>
              时空特使的不记名者，编号GA-00，人称“熊孩子”的林苍月。<br>
              <br>
              <img src="/old/img/story/story_n3.jpg" class="m-auto">
            </p>
            <p v-if="nowPage == 4">
              “没让你自己冲锋，笨蛋！”你一面暗暗叫苦，一面努力在逃散的人群中挤开一条路。<br>
              “计划彻底乱了，”有其他潜伏者向你发来消息，“这下只能随机应变了。”<br>
              <br>
              还没等林苍月继续犯傻，舞台上又出现了三个来者不善的身影。<br>
              <span class="clan">“电击使 御坂 美琴。”</span><br>
              <span class="yellow !font-normal">“班主任 坂持 金发。”</span><br>
              <span class="lime !font-normal">“四季花之主 风见 幽香。”</span><br>
              <span class="yellow !font-normal"> “金龙通讯社执行官三人组，特此前来维护会场秩序！”</span><br>
              <br>
              <img src="/old/img/story/story_n4.jpg" class="m-auto">
              <br>
              三人自报了姓名之后，摆开架势将林苍月围在中间。<br>
              <span class="seagreen">“你们金龙通讯社的兴趣还挺重口味的。”</span>林苍月皱着眉头。
            </p>
            <p v-if="nowPage == 5">
              不能再等了。<br>
              <br>
              你召唤出“开关”，用力按了下去。<br>
              <span class="red !font-normal">“警告：中枢程序区域侦测到不明代码。”</span><br>
              冰冷而刺耳的警告声让执行官们一时间不知所措。<br>
              <span class="seagreen">“哼，三十六计走为上！”</span><br>
              明亮的登出光圈包裹了林苍月。这个没脑子的家伙反应倒挺快。<br>
              <span class="ltcrimson">“想跑？”</span>红暮的声音再度传来，<span class="ltcrimson b">“‘大逃杀’强行启动！”</span><br>
              <br>
              各式各样的警告信息瞬间把虚拟会场淹没了。<br>
              <span class="red !font-normal">“警告：侦测到非法的道具数据：提示纸条A、提示纸条B……”<br>
              “警告：无月之影BOSS数据缺失。”<br>
              “警告：键刃墓场BOSS数据缺失。”<br>
              “警告：干扰迎击系统运转不正常。”<br>
              “警告：核心程序有实体化的趋势，压制中。”<br>
              “警告：参战者精神状况监视程序无法运行。”……</span><br>
              <br>
              <span class="ltcrimson">“……没办法了，缺失的位置就只能由我和——嘛，就由我顶上吧。其他的交给……处理。”</span><br>
            </p>
            <p v-if="nowPage == 6">
              <span class="seagreen">“没想到吧！”</span>熊孩子竟然还隔空斗嘴，<span class="seagreen">“我们事先注入了病毒，虚拟幻境已经千疮百孔！”</span><br>
              <span class="ltcrimson">“你以为，我想要截住的是你吗？”</span>红暮不怀好意地笑着。<br>
              <br>
              “没法登出了！”	“真要在这个情况下进行大逃杀吗？！”<br>
              你身旁的挑战者们惊慌地喊道。<br>
              虽然已有许多人跑路成功，但是没登出的挑战者还有一大堆。<br>
              真是一团糟，这样就没法救到全部人了啊！<br>
              <span class="ltcrimson">“我想要截住的……”</span>红暮扭头望向这里，对上了你的目光。<br>
              你感到一丝惶恐。难道，潜伏的我们也已经被发现了？<br>
              <br>
              <img src="/old/img/story/story_n7.jpg" class="m-auto">
              <br>
              <span class="ltcrimson">“是你们。”</span>红暮伸手一握，你的视野被传送光圈吞没了。
            </p>
            <p v-if="nowPage == 7">
              <span class="evergreen !font-normal">“在座各位的精神已经被锁定了。如果妄图强行退出，意识就会被消灭……”</span><br>
              虚拟传送每次都让你你头昏脑涨。<br>
              <br>
              <span class="evergreen !font-normal">“杀掉所有的人，只剩下你自己……”</span><br>
              耳边隐隐约约传来不知何年何月的“大逃杀”揭幕词。<br>
              <br>
              <span class="evergreen !font-normal">“这个世界不需要平庸的凡人，只需要有力量的强者！”</span><br>
              何等的奇谈怪论。<br>
              <br>
              <span class="evergreen !font-normal">“注意时间，不要在禁区滞留。失去每一位可能的获胜者都是我们的损失……”</span><br>
              这个情景似曾相识得让你不安。<br>
              <br>
              <span class="evergreen !font-normal">“记住，装备很重要，但也不是最重要的。你的实力才是决定你命运的关键。”</span><br>
              我，还有翻盘的机会吗……？<br>
              <br>
              <br>
              <div class="text-center">
                <span class="red">■ LIFE GAME ■</span><br>
                <span id="br" class="red b" style="font-weight:700;font-size:20pt;line-height:20pt;">大 逃 杀</span><br>
              </div>
              <br>
              <br>
              <span class="ltcrimson">“祝你们好运。你们的实力……我可是很感兴趣呢。”</span>
            </p>
          </div>
          <div class="flex justify-end space-x-4 mt-4">
            <p v-if="nowPage" @click="nowPage--" class="ring-1.5 ring-zinc-300 text-zinc-300 p-0.5 cursor-pointer w-max">
              <p class="text-sm bg-zinc-300 pl-2.5 pr-2 py-1 text-zinc-800 font-bold tracking-widest transition-colors hover:bg-transparent hover:text-zinc-300">上一页</p>
            </p>
            <p v-if="nowPage != 7" @click="nowPage++" class="ring-1.5 ring-zinc-300 text-zinc-300 p-0.5 cursor-pointer w-max">
              <p class="text-sm bg-zinc-300 pl-2.5 pr-2 py-1 text-zinc-800 font-bold tracking-widest transition-colors hover:bg-transparent hover:text-zinc-300">下一页</p>
            </p>
            <p v-if="nowPage == 7" @click="close()" class="ring-1.5 ring-zinc-300 text-zinc-300 p-0.5 cursor-pointer w-max">
              <p class="text-sm bg-zinc-300 pl-2.5 pr-2 py-1 text-zinc-800 font-bold tracking-widest transition-colors hover:bg-transparent hover:text-zinc-300">进入战场</p>
            </p>
          </div>
        </template>
      </div>
    </div>
  </Transition>
</template>