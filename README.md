# Intesa Vincente

WebApp ispirata al gioco "Intesa Vincente" del programma estivo "Reazione a Catena", trasmesso su Rai 1.

## Sito web
L'app è disponibile su [intesavincente.lucamartinelli.eu.org](https://intesavincente.lucamartinelli.eu.org).

## Regolamento

- **Due giocatori** terranno il dispositivo con segnato il tempo, il punteggio e la **parola da indovinare**, il **terzo giocatore** terrà il dispositivo con la **pulsantiera**;
- I due giocatori dovranno formulare frasi di **senso compiuto** per descrivere la parola. Se il terzo giocatore **indovina** viene assegnato **un punto**, in caso contrario ne viene tolto uno;
- Ogni sessione di gioco ha **tre passo disponibili** da utilizzare se non si è in grado di formulare una frase;
- I giocatori che compongono le frasi devono **alternarsi** dicendo **una sola parola** per volta. In caso contrario il tempo si ferma e si **scala un punto**;
- **Non** sono ammessi **telegrammi**, solo frasi complete e con un senso;
- **Non** sono ammesse parole che contengano la **stessa radice** o siano **sinonimi** o **traduzioni** della parola da cercare. In caso contrario si scala un punto.

## Come funziona

All'avvio del gioco viene creata **una stanza**. In questo modo, se più dispositivi accedono alla stessa stanza questi saranno **sincronizzati** per quanto riguarda il **tempo** e i **passo** rimanenti, le **parole** mostrate e il **punteggio** totale. Da **ogni dipositivo** è inoltre possibile **fermare** e far **ripartire** il **timer** in qualsiasi momento, **aggiungere** o **togliere** **punti**, utilizzare i **passo** o **ricominciare** il gioco da capo.

In questo modo, i due **giocatori** che devono **formulare** le frasi possono tenere due dispositivi con il layout "_Predefinito_", dove viene mostrata la **parola**. Il terzo **giocatore**, che deve **indovinare** la parola, può accedere con la modalità "_Pulsantiera_", dove **non vede** la parola ma può **controllare** facilmente il timer.

## Tecnologie

- Server [NodeJS](https://nodejs.org/)
- Web Server [ExpressJS](https://expressjs.com/)
- Template Engine [PUG](https://pugjs.org/)
- Web Socket [Socket.io](https://openjsf.org/)
