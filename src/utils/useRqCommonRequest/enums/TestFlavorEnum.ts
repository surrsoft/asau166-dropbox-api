/** различные сценарии работы хука, для тестовых целей */

export enum TestFlavorEnum {
  /** по умолчанию - без применения flavor */
  UNDEF = "undef",
  /** бросание ошибки сразу после {@link pauseMsc} */
  F3 = "f3"
}
