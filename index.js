const express = require('express');
const { Socket } = require('node:dgram');
const { createServer } = require('node:http');
const { join } = require('node:path');
const {Server}=require('socket.io')

const app = express();
// serve static files (videos, html, fonts, etc.) from the project root
app.use(express.static(__dirname));
const server = createServer(app);
const io=new Server(server)

app.get('/c', (req, res) => {
  res.sendFile(join(__dirname, 'control.html'));
});
app.get('/g', (req, res) => {
  res.sendFile(join(__dirname, 'gpx.html'));
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

let vNs=io.of('v')
let cNs=io.of('c')
let hNs=io.of('h')
let pNs=io.of('p')

cNs.on('connection',s=>{
  console.log('user connected')
  s.on('introMoneyTree',() => {
    vNs.emit('introMoneyTree')
  })
  s.on('introSafe1',() => {
    vNs.emit('introSafe1')
  })
  s.on('introSafe2',() => {
    vNs.emit('introSafe2')
  })
  s.on('introSafe3',() => {
    vNs.emit('introSafe3')
  })
  s.on('introLifeline1',() => {
    vNs.emit('introLifeline1')
  })
  s.on('introLifeline2',() => {
    vNs.emit('introLifeline2')
  })
  s.on('introLifeline3',() => {
    vNs.emit('introLifeline3')
  })
  s.on('introLifeline4',() => {
    vNs.emit('introLifeline4')
  })
  s.on('showMoneyTree',(quesNum)=>{
    vNs.emit('showMoneyTree',quesNum)
  })
  s.on('hideMoneyTree',()=>{
    vNs.emit('hideMoneyTree')
  })
  s.on('showQ',(qna,quesNum)=>{
    console.log(qna,quesNum)
    vNs.emit('showQ',qna,quesNum)
    pNs.emit('showQ',qna)
    hNs.emit('showQ',qna)
  })
  s.on('showAnsTier1',(quesNum)=>{
    vNs.emit('showAnsTier1',quesNum)
    pNs.emit('showAnsTier1',quesNum)
    hNs.emit('showAnsTier1',quesNum)
  })
  s.on('showAnsTier2',(quesNum)=>{
    vNs.emit('showAnsTier2',quesNum)
    pNs.emit('showAnsTier2',quesNum)
    hNs.emit('showAnsTier2',quesNum)
  })
  s.on('showA',()=>{
    vNs.emit('showA')
    pNs.emit('showA')
    hNs.emit('showA')
  })
  s.on('showB',()=>{
    vNs.emit('showB')
    pNs.emit('showB')
    hNs.emit('showB')
  })
  s.on('showC',()=>{
    vNs.emit('showC')
    pNs.emit('showC')
    hNs.emit('showC')
  })
  s.on('showD',()=>{
    vNs.emit('showD')
    pNs.emit('showD')
    hNs.emit('showD')
  })
  s.on('choose',(ans,quesNum,isMuted,correctAns,explain)=>{
    vNs.emit('choose',ans,quesNum,isMuted)
    pNs.emit('choose',ans)
    hNs.emit('choose',ans,correctAns,explain)
  })
  s.on('revealCorrect',(correctAns,quesNum,prize,isMuted)=>{
    vNs.emit('revealCorrect',correctAns,quesNum,prize,isMuted)
    pNs.emit('revealCorrect',correctAns,quesNum,prize)
    hNs.emit('revealCorrect',correctAns,quesNum,prize)
  })
  s.on('nextQuestion',(quesNum,prizeInfo)=>{
    vNs.emit('nextQuestion',quesNum)
    pNs.emit('nextQuestion',quesNum)
    hNs.emit('nextQuestion',quesNum,prizeInfo)
  })
  s.on('walkAway',(quesNum)=>{
    vNs.emit('walkAway',quesNum)
    pNs.emit('walkAway')
    hNs.emit('walkAway')
  })
  s.on('showTotalPrize',prize=>{
    vNs.emit('showTotalPrize',prize)
    pNs.emit('showTotalPrize',prize)
    hNs.emit('showTotalPrize',prize)
  })
  s.on('hideTotalPrize',()=>{
    vNs.emit('hideTotalPrize')
    pNs.emit('hideTotalPrize')
    hNs.emit('hideTotalPrize')
  })
  s.on('stopClock',(quesNum)=>{
    vNs.emit('stopClock',quesNum)
    pNs.emit('stopClock',quesNum)
    hNs.emit('stopClock',quesNum)
  })
  s.on('resumeClock',(quesNum)=>{
    vNs.emit('resumeClock',quesNum)
    pNs.emit('resumeClock',quesNum)
    hNs.emit('resumeClock',quesNum)
  })
  s.on('clearAnim',()=>{
    vNs.emit('clearAnim')
  })
  s.on('showGpx',()=>{
    vNs.emit('showGpx')
  })
  s.on('hideGpx',()=>{
    vNs.emit('hideGpx')
  })
  s.on('stqActivate',()=>{
    vNs.emit('stqActivate')
  })
  s.on('stq',()=>{
    vNs.emit('stq')
  })
  s.on('stqQuestion',(qna)=>{
    vNs.emit('stqQuestion',qna)
    pNs.emit('stqQuestion',qna)
    hNs.emit('stqQuestion',qna)
  })
  s.on('playAtaBed',()=>{
    vNs.emit('playAtaBed')
  })
  s.on('ataEnd',percentages=>{
    let intPercentage=[]
    percentages.forEach(percent=>{
      intPercentage.push(parseFloat(percent))
    })
    console.log(intPercentage)
    vNs.emit('ataEnd',intPercentage)
  })
  s.on('ata',()=>{
    vNs.emit('ata')
  })
  s.on('ataUpdate',(howManyAns,percentages)=>{
    console.log(howManyAns,percentages)
    hNs.emit('ataUpdate',howManyAns,percentages)
  })
  s.on('fifty',ans=>{
    console.log(ans)
    vNs.emit('fifty',ans)
  })
  s.on('playSound',sound=>{
    vNs.emit('playSound',sound)
  })
  s.on('updatePrizeInfo',(prizeInfo,quesNum)=>{
    hNs.emit('updatePrizeInfo',prizeInfo,quesNum)
  })
  s.on('playerInfo',msg=>{
    hNs.emit('playerInfo',msg)
  })
  s.on('message',msg=>{
    hNs.emit('message',msg)
  })
  s.on('pafBed',()=>{
    vNs.emit('pafBed')
    hNs.emit('pafBed')
    pNs.emit('pafBed')
  })
  s.on('pafTime',()=>{
    vNs.emit('pafTime')
    hNs.emit('pafTime')
    pNs.emit('pafTime')
  })
  s.on('pafEnd',()=>{
    vNs.emit('pafEnd')
    hNs.emit('pafEnd')
    pNs.emit('pafEnd')
  })
  s.on('disableLifeline',(ll)=>{
    vNs.emit('disableLifeline',ll)
    hNs.emit('disableLifeline',ll)
    pNs.emit('disableLifeline',ll)
  })
  s.on('enableLifeline',(ll)=>{
    vNs.emit('enableLifeline',ll)
    hNs.emit('enableLifeline',ll)
    pNs.emit('enableLifeline',ll)
  })
})

vNs.on('connection',s=>{
  s.on('playerAns',ans=>{
    currentAns=ans
    gpxNs.emit('choose', ans, numOfAns)
    pNs.emit('disableAnsButtons')
    if(isDoubleUsed==false) pNs.emit('enableDouble')
  })
  s.on('playerDouble',()=>{
    isDoubleUsed=true
    gpxNs.emit('double')
    pNs.emit('disableDouble')
  })
})