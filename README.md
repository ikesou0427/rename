# ファイル名管理ツール
## rename jpgファイルの再名付け 使い方
1. 名前を付け直したいファイルをfromに入れる
2. `ts-node rename.ts` をコマンドラインで実行
3. toを確認

## draw-up renameしたファイルの整列(歯抜け解消)
1. toにrenameしたファイルをすべて入れる
2. `ts-node draw-up-images-name.ts` を実行
3. toを確認

### 補足
next-header.jsonの値の連番でファイル名が付けられます<br>
ファイル名はAA000からZZ999まで対応<br>
一度実行するたびにAAならAB、BZならCAが次のファイルの名前になります<br>