# React_sugoroku2

## テスト方法(9/16) 
### Node.js環境構築
- https://nodejs.org/ja/download/ からnode.jsのインストーラをダウンロードしてインストール
- githubかこのプロジェクトをclone
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
- バックエンドでゲームの処理をすべて行ってほしい
  - 次が一回休みのプレイヤーならそのフラグをオフにして，ターンプレイヤーを2つ先の人にするなど

- ゴールの処理
  - ゴールマスに止まったときのイベント処理がされない: executeSquareEvent
  - ゴールしたプレイヤーのターンをスキップ
  - 
- ポイント取得/減少イベント処理
- 一回休み処理
- 

## 今後の方針
- 盤面
- 処理
  - さいころ振ってREST呼び出す
  - バックエンドで更新されたプレイヤーの情報を受け取り，コンポーネントの内部情報を更新
  - コマをマスに移動させる
  - 止まったマスの詳細情報・イベント内容がポップアップ
  - 確認ボタンを押したらイベント関係の処理をRESTで呼び出す
  - バックエンドで更新されたプレイヤーの情報を受け取り，コンポーネントの内部情報を更新
  - コマをマスに移動させる・ポイントを更新する
  - ターンプレイヤーが切り替わる
  
- MAY
- コマのアニメーション



## データの受け渡しについて
- 子コンポーネントから親コンポーネントのメゾットを呼び出します
- 親コンポーネントのメゾットで親コンポーネントの値(state)を書き換える
- その後の親コンポーネントの値(state)は？
