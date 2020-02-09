set b=1000
for %%a in (*.jpg) do (
  call,set/a b+=1
  call,ren "%%a" "%%b:~-3%%.jpg"
)