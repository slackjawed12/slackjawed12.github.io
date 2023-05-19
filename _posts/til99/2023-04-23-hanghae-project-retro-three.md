---
layout: single

title: "[WIL] 실전 프로젝트 3주차 회고 - 예약 도메인 구현"
categories: til99
tag: [WIL]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 4/16 ~ 4/22 회고

&nbsp; &nbsp; 3주차의 주제는 예약 도메인의 구현이었다. 회의 예약 도메인은 동시에 예약이 등록되는 문제를 고려해야 했다.
&nbsp; &nbsp; 

## 2. 예약 등록의 구현

&nbsp; &nbsp; 예약 도메인의 구현은 시간정보를 다룬다는 것이 핵심이었다. 정보들을 찾아본 결과, 시간 정보는 LocalDateTime으로 다뤄야 편리했다. 첫 번째로, 클라이언트와 시간정보를 주고받을 때 API를 어떻게 설계할 것인지에 대한 문제가 있었다. 두 번째로, 예약을 등록할 때, 시간이 중복되는 경우 등록하지 못하도록 예외를 처리해야 한다. 이 두 문제를 해결하는 것이 예약 도메인 구현의 기초적인 과제였다.    
&nbsp; &nbsp; 마지막으로, 여러 스레드에서 동시에 시간이 중복되는 예약을 등록할 경우의 문제, 즉 동시성 문제를 해결해야 했다.

## 3. 시간 정보 API
&nbsp; &nbsp; 형식은 ISO 8601 표기법으로 통일했다. 다만 예약 시간을 설정할 때 요구사항에 의해 API가 변경될 때마다 서비스 로직이 크게 변경되는 문제가 있었다. 특히 타임테이블을 불러올 때 유지보수가 편하게 비즈니스 로직을 작성하는 것이 어려웠다.  
```json
{
    "startList" : [ 
        {
            "start" : "2023-04-23T13:00"
        },
        {
            "start" : "2023-04-23T14:00"
        }
    ]
}
```
&nbsp; &nbsp; 이 형식대로 받는 경우, Spring에서는 쿼리파라미터로 받든, json으로 받든 상관없이 바로 Mapping 할 수 있기 때문에 편하다. 쿼리파라미터로 받으면, Controller에서 아래와 같이 시간정보의 파라미터에 대한 애노테이션인 @DateTimeFormat을 붙여주면 된다.

```java
public ResponseEntity getReservationTimetable(
        @RequestParam(value = "selDate", required = true)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate selDate,
        @PathVariable Long meetingRoomId) {
        return ResponseMessage
                .responseSuccess("예약 조회 성공", reservationService.getReservationTimetable(selDate, meetingRoomId, userDetails));
```

문제는 이 형식이 프론트엔드 파트에서 처리하기 어려웠다는 점이다. 연,월,일을 따로 나누어 처리를 해야 했는지는 고민되는 부분이다. 

## 4. 중복된 예약 시간의 등록 예외처리
&nbsp; &nbsp; 이미 등록된 예약이 있는지 확인하는 쿼리를 다음과 같이 작성했다. 

```java
@Query("select r from Reservation r " +
        "where r.meetingRoom.id = :meetingRoomId and r.startTime < :endTime and r.endTime > :startTime")
Optional<Reservation> findDuplicatedReservation(
            @Param("meetingRoomId") Long meetingRoomId,
            @Param("startTime") LocalDateTime start,
            @Param("endTime") LocalDateTime end);
```

## 5. 동시 예약 예외처리
&nbsp; &nbsp; 동시 예약의 예외처리는 위의 쿼리에 Pessimistic Lock을 설정하는 방식으로 처리했다. 여러 스레드에 대해 동시예약이 불가능한지를 테스트 코드를 작성해서 확인하려고 했으나, 결국 하지 못했다. 다만 JMeter로 반복측정 했을 때 여러 스레드에서 실험해도 1개만 등록에 성공하는 것을 확인할 수 있었다.