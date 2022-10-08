# React_sugoroku2

## テスト方法(9/23)
### ローカルでReactすごろくを立ち上げてテストする場合
- マスの作成は　https://es4.eedept.kobe-u.ac.jp/miraisugoroku/ で行う
  - 中村研のサーバのmysqlにつながっているため，そっちにマスが作成される
- https://es4.eedept.kobe-u.ac.jp/miraisugoroku/config? のゲーム設定画面ですごろくを開始する
- 次のページのURIのsugorokuIdを控える
- http://localhost:3000/?sid={sugorokuId} でアクセス

## テスト方法(9/16) 
### Node.js環境構築
- https://nodejs.org/ja/download/ からnode.jsのインストーラをダウンロードしてインストール
- githubからこのプロジェクトをclone
- ターミナルでReact_sugoroku2/animation_sugorokuにcd
- yarnをインストール
```
(React_sugoroku2/animation_sugorokuで)
npm install yarn
```

### 実行
- mysqldを立ち上げる
- ローカルでMiraiSugorouku2を立ち上げて，ゲーム設定画面で設定をしてゲーム開始ボタンを押す．
- ゲーム画面のuriからsugorokuIdを見る(http://localhost:2289/game/25  の25のところがsugorokuId)
- Reactのすごろくゲームを npm start で立ち上げる
```
(React_sugoroku2/animation_sugorokuで)
npm start
```
- localhost:3000/{sugorokuId} にアクセス(localhost:/3000/25　など)
- ゲーム画面が表示されるはず


## バックエンド改修項目
- コースの長さ設定:中・長に対応

- バックエンドでゲームの処理をすべて行ってほしい
  - 次が一回休みのプレイヤーならそのフラグをオフにして，ターンプレイヤーを2つ先の人にするなど

- ゴールの処理
  - ゴールマスに止まったときのイベント処理がされない: executeSquareEvent
  - ゴールしたプレイヤーのターンをスキップ
  - 
  
- ゲーム終了フラグ
  - 全員がゴールしたときにオンになるようなもの
  
- ポイント取得/減少イベント処理
- 一回休み処理
- 

## 10/5時点のToDo
- マスの見た目
  - プラスイベント・マイナスイベントで色を分ける
  - タイトルの文字数に応じて文字の大きさを変える(マスに収める)
- モーダルの見た目
  - プラス/マイナスイベントで色を分ける
    - ModalStyle内のcssに，plussセレクタ，minusセレクタを作って，条件分岐でModalStyleのclassNameを設定
  - レイアウトを改善する
- メニュー
  - ゴール状態が分かるようにする
  - ターンプレイヤーが分かるように表示する
    - 文と，プレイヤーステータスの枠線を変える
- 背景
  - 矢印で進む方向をわかるように
  - いい感じの背景（必要？)
- SE(できれば)
  - サイコロ回ってる音
  - ポイントゲットした音
  - マスを移動した音
  - など  


## 今後の方針
- 中・長分のマス位置を指定しておく。
    - 中距離の双六に耐えうるデータを作る
- マスのクリックで詳細を表示する
- モーダルの見た目を綺麗にする
- メニューサイズ
- ゲームとプレイヤーバーについて画面内スクロールを実装




## データの受け渡しについて
- 子コンポーネントから親コンポーネントのメゾットを呼び出します
- 親コンポーネントのメゾットで親コンポーネントの値(state)を書き換える
- その後の親コンポーネントの値(state)は？
