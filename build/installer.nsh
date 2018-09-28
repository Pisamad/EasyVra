!include "EnvVarUpdate.nsh"

!macro customInstall
    ${EnvVarUpdate} $0 "PATH" "A" "HKCU" $INSTDIR
!macroend

!macro customUnInstall
    ${un.EnvVarUpdate} $0 "PATH" "R" "HKCU" $INSTDIR
!macroend
