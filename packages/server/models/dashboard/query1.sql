SELECT
    COUNT(amount) as count,
    SUM(amount) as amount

FROM `order` o

WHERE o.created_at BETWEEN '{0}' AND '{1}'